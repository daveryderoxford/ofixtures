import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Storage, ref } from "@angular/fire/storage";
import { UserData } from 'app/model';
import { Fixture, LatLong } from 'app/model/fixture';
import { FixtureFilter, GradeFilter } from 'app/model/fixture-filter';
import { UserDataService } from 'app/user/user-data.service';
import { differenceInMonths, isFuture, isSaturday, isSunday, isToday, isWeekend } from 'date-fns';
import { getDownloadURL } from 'rxfire/storage';
import { BehaviorSubject, Observable, combineLatest, of, firstValueFrom} from 'rxjs';
import { catchError, map, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { getFromLocalStorage, LocalStorageLocationData, saveToLocalStorage } from './local-storage';

function anyWordStartsWith( str: string, search: string): boolean {
   if (!str) return false;
   const words = str.toLocaleLowerCase().split(' ');
   return words.some( word => word.startsWith(search));
}

@Injectable( {
   providedIn: 'root'
} )
export class FixturesService {
   protected usd = inject(UserDataService);
   protected storage = inject(Storage);
   protected http = inject(HttpClient);

   static DEFAULT_FILTER = {
      time: { sat: true, sun: true, weekday: true },
      gradesEnabled: true,
      grades: makeDefaultGrades(),
      likedOnly: false
   };

   static DEFAULT_POSTCODE = 'TW18 2AB';
   static DEFAULT_LATLNG = { "lat": 51.43116, "lng": -0.508227 };

   private _postcode$ = new BehaviorSubject<string>( FixturesService.DEFAULT_POSTCODE );
   readonly postcode$ = this._postcode$.asObservable();

   private _homeLocation$ = new BehaviorSubject<LatLong>( FixturesService.DEFAULT_LATLNG );
   readonly homeLocation$ = this._homeLocation$.asObservable();

   private _filter$ = new BehaviorSubject<FixtureFilter>( FixturesService.DEFAULT_FILTER );
   readonly filter$ = this._filter$.asObservable();

   private _search$ = new BehaviorSubject<string>('');
   readonly search$ = this._search$.asObservable;

   private _fileContents$: Observable<Fixture[]> = getDownloadURL( ref( this.storage, "fixtures/uk" ) ).pipe(
      switchMap( url => this.http.get<Fixture[]>( url ) ),
      map( fixtures => futureFixtures( fixtures ) ),
      startWith( [] ),
      shareReplay( 1 ),
      catchError( this.handleError<Fixture[]>( 'Fixture download', [] ) )
   );

   private _selectedFixture$ = new BehaviorSubject<Fixture | null>( null );
   readonly selectedFixture$ = this._selectedFixture$.asObservable();

   // TO DO until we moved completely to signals
   private user$ = toObservable( this.usd.userdata );

   constructor () {

      const grades = getFromLocalStorage( 'grades' ) as GradeFilter[];
      if ( grades ) {
         this._filter$.next( { ...FixturesService.DEFAULT_FILTER, grades: grades } )
      }

      const location = getFromLocalStorage( 'location' ) as LocalStorageLocationData;
      if ( location ) {
         this._postcode$.next( location.postcode );
         this._homeLocation$.next( location.latlng );
      }

      
      /* When user changes - set filters to reflect user details and unset liked only */
      effect( () => {
          const user = this.usd.userdata();
         if ( user ) {
            if ( user.postcode && user.postcode !== "" ) {
               this.setPostcode( user.postcode );
            }
            if ( user.fixtureGradeFilters ) {
               this.setFilter( { ...this._filter$.value, grades: user.fixtureGradeFilters } );
            }
         } else {
            // set likedonly to false on logout
            this.setFilter( { ...this._filter$.value, likedOnly: false } );
         }
      } );
   }

   allFixtues(): Observable<Fixture[]> {
      return this._fileContents$!;
   }

   getFixtures(): Observable<Fixture[]> {

      const fixturesWithDistance$ = combineLatest( [this._fileContents$, this._homeLocation$] ).pipe(
         map( ( [fixtures, loc] ) => {
            const n = fixtures.map( fix => {
               fix.distance = this._distanceFromHome( fix, loc );
               return fix;
            } );
            return n;
         }
         ),
         shareReplay( 1 ),
      );

      const fixturesObs$ = combineLatest( [fixturesWithDistance$, this.user$, this._filter$, this._search$] ).pipe(
         map( ( [fixtures, userdata, ftr, search] ) => fixtures.filter( fix => isFixtureShown( fix, userdata, ftr, search ) ) )
      );

      return fixturesObs$;
   }

   setSelectedFixture( fixture: Fixture | null ) {
      this._selectedFixture$.next( fixture );
   }

   /** Updates the postcode used for fixture location calculation
    * Returns promise containg the calculated lat long or null if the latlong could not be calculated 
    */
   async setPostcode( postcode: string ): Promise<LatLong | null> {

      const latlng = await firstValueFrom( this._calcLatLong( postcode ));

      if ( latlng ) {
         this._postcode$.next( postcode );
         this._homeLocation$.next( latlng );
         saveToLocalStorage( 'location', { postcode: postcode, latlng: latlng } );
      } else {
         console.log( `FixturesService: Not updating home location as latlong could not be determined for ${postcode}` );
      }

      return ( latlng );
   }

   setFilter( f: FixtureFilter ) {
      this._filter$.next( f );
      saveToLocalStorage( 'grades', f?.grades );
   }

   setSearch( str: string) {
      this._search$.next(str);
   }

   /** Calculate lat long from postcode, returning null if lat/long could not be calculated */
   private _calcLatLong( postcode: string ): Observable<LatLong | null> {
      const obs = this.http.get<any>( "https://api.postcodes.io/postcodes/" + postcode ).pipe(
         catchError( this.handleError<LatLong>( 'FixturesService: Postcode location failed' ) ),
         map( obj => {
            if ( obj === null || obj.result === null || obj.result.latitude === null ) {
               return null;
            }
            const loc: LatLong = {
               lat: obj.result.latitude,
               lng: obj.result.longitude
            };
            return loc;
         }
         ),
         tap( obj => console.log( `FixturesService: Calculaing latlong for postcode: ${postcode} lat: ${obj?.lat} long: ${obj?.lng}` ) )
      );

      return obs;
   }

   private _getDistanceFromLatLngInKm( pos1: LatLong, pos2: LatLong ): number {
      const R = 6371; // Radius of the earth in km
      const dLat = this._deg2rad( pos2.lat - pos1.lat );
      const dLon = this._deg2rad( pos2.lng - pos1.lng );
      const a =
         Math.sin( dLat / 2 ) * Math.sin( dLat / 2 ) +
         Math.cos( this._deg2rad( pos1.lat ) ) * Math.cos( this._deg2rad( pos2.lat ) ) *
         Math.sin( dLon / 2 ) * Math.sin( dLon / 2 );
      const c = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1 - a ) );
      const d = R * c; // Distance in km
      return d;
   }

   private _deg2rad( deg: number ): number {
      return deg * ( Math.PI / 180 );
   }

   private _distanceFromHome( fix: Fixture, home: LatLong ): number {
      const kmToMiles = 0.62137119224;
      if ( !home || !fix.latLong ) {
         return -1;
      }
      const dist = this._getDistanceFromLatLngInKm( home, fix.latLong );
      return Math.round( dist * kmToMiles );
   }

   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>( operation = 'operation', result?: T ) {
      return ( error: any ): Observable<T> => {

         // TODO: send the error to remote logging infrastructure
         console.log( operation + error );

         // TODO: better job of transforming error for user consumption
         //  this.log( `${operation} failed: ${error.message}` );

         // Return default result.
         return of( result as T );
      };
   }
}

function makeDefaultGrades(): GradeFilter[] {
   return [
      { name: 'IOF', enabled: true, distance: 1000, time: 48 },
      { name: 'International', enabled: true, distance: 1000, time: 48 },
      { name: 'National', enabled: true, distance: 500, time: 12 },
      { name: 'Regional', enabled: true, distance: 100, time: 12 },
      { name: 'Club', enabled: true, distance: 60, time: 6 },
      { name: 'Local', enabled: true, distance: 40, time: 2 },
   ];
}

function futureFixtures( fixtures: Fixture[] ): Fixture[] {
   return fixtures.filter( fix => {
      const d = new Date( fix.date );
      return isToday( d ) || isFuture( d );
   } );
}

function isFixtureShown( fix: Fixture, userdata: UserData | null | undefined, ftr: FixtureFilter, search: string): boolean {

   const fixdate = new Date( fix.date );

   const timeFilterPassed = ( isSaturday( fixdate ) && ftr.time.sat === true ) ||
      ( isSunday( fixdate ) && ftr.time.sun === true ) ||
      ( !isWeekend( fixdate ) && ftr.time.weekday === true );

   let gradeOFilterPassed: boolean;
   if ( ftr.gradesEnabled ) {
      const gradeFilter = ftr.grades.find( ( grade ) => grade.name === fix.grade )!;

      gradeOFilterPassed = gradeFilter.enabled &&
         differenceInMonths( fixdate, new Date() ) <= gradeFilter.time &&
         (fix.distance !==undefined && fix.distance < gradeFilter.distance);
   } else {
      gradeOFilterPassed = true;
   }

   let isLiked = false;
   const likedOnly = ftr.likedOnly;
   isLiked = userdata ? userdata.reminders.includes( fix.id ) : true;

   const s = search.toLocaleLowerCase();

   const searchPassed = !s || s === '' || 
      anyWordStartsWith(fix.club, s) || 
      anyWordStartsWith(fix.area, s) || 
      anyWordStartsWith(fix.nearestTown, s) || 
      anyWordStartsWith(fix.name, s);
   // For liked only show all liked events.  Otherwise filter based on time and grade fiilters
   return likedOnly ? isLiked : timeFilterPassed && gradeOFilterPassed && searchPassed;

}