import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Storage, ref } from "@angular/fire/storage";
import { Fixture, LatLong } from 'app/fixtures/@store/fixture';
import { isFuture, isToday } from 'date-fns';
import { getDownloadURL } from 'rxfire/storage';
import { Observable, firstValueFrom, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { LocalStorageLocationData, LocalStorageService } from './local-storage';

@Injectable({
   providedIn: 'root'
})
export class FixturesService {
   protected storage = inject(Storage);
   protected http = inject(HttpClient);
   private ls = inject(LocalStorageService);

   static DEFAULT_POSTCODE = 'TW18 2AB';
   static DEFAULT_LATLNG = { "lat": 51.43116, "lng": -0.508227 };

   private _postcode = signal<string>(FixturesService.DEFAULT_POSTCODE);
   readonly postcode = this._postcode.asReadonly();

   private _homeLocation = signal<LatLong>(FixturesService.DEFAULT_LATLNG);
   readonly homeLocation = this._homeLocation.asReadonly();

   private _fileContents$: Observable<Fixture[]> = getDownloadURL(ref(this.storage, "fixtures/uk")).pipe(
      switchMap(url => this.http.get<Fixture[]>(url)),
      map(fixtures => futureFixtures(fixtures)),
      catchError(this.handleError<Fixture[]>('Fixture download', []))
   );

   rawFixtures = rxResource<Fixture[], boolean>({
      loader: () => this._fileContents$,
      defaultValue: [],
   });

   fixtures = computed(() => this.rawFixtures.value()
      .map(fix => {
         return { ...fix, distance: distanceFromHome(fix, this._homeLocation()) };
      })
   );

   loading = computed(() => this.rawFixtures.isLoading());
   error = computed(() => this.rawFixtures.error());

   constructor() {

      console.log('FixturesService: constructor');

      const location = this.ls.getFromLocalStorage('location') as LocalStorageLocationData;
      if (location) {
         this._postcode.set(location.postcode);
         this._homeLocation.set(location.latlng);
      }
   }

   /** Updates the postcode used for fixture location calculation
    */
   async setPostcode(postcode: string): Promise<LatLong | null> {

      const latlng = await firstValueFrom(this._calcLatLong(postcode));

      if (latlng) {
         this._postcode.set(postcode);
         this._homeLocation.set(latlng);
         this.ls.saveToLocalStorage('location', { postcode: postcode, latlng: latlng });
      } else {
         console.log(`FixturesService: Not updating home location as latlong could not be determined for ${postcode}`);
      }
      return latlng;
   }

   /** Calculate lat long from postcode, returning null if lat/long could not be calculated */
   private _calcLatLong(postcode: string): Observable<LatLong | null> {
      const obs = this.http.get<any>("https://api.postcodes.io/postcodes/" + postcode).pipe(
         catchError(this.handleError<LatLong>('FixturesService: Postcode location failed')),
         map(obj => {
            if (obj === null || obj.result === null || obj.result.latitude === null) {
               return null;
            }
            const loc: LatLong = {
               lat: obj.result.latitude,
               lng: obj.result.longitude
            };
            return loc;
         }
         ),
         tap(obj => console.log(`FixturesService: Calculaing latlong for postcode: ${postcode} lat: ${obj?.lat} long: ${obj?.lng}`))
      );

      return obs;
   }

   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

         // TODO: send the error to remote logging infrastructure
         console.log(operation + error);

         // TODO: better job of transforming error for user consumption
         //  this.log( `${operation} failed: ${error.message}` );

         // Return default result.
         return of(result as T);
      };
   }
}

const deg2rad = (deg: number) => deg * Math.PI / 180;

function getDistanceFromLatLngInKm(pos1: LatLong, pos2: LatLong): number {
   const R = 6371; // Radius of the earth in km
   const dLat = deg2rad(pos2.lat - pos1.lat);
   const dLon = deg2rad(pos2.lng - pos1.lng);
   const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(pos1.lat)) * Math.cos(deg2rad(pos2.lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
   const d = R * c; // Distance in km
   return d;
}

function distanceFromHome(fix: Fixture, home: LatLong): number {
   const kmToMiles = 0.62137119224;
   if (!home || !fix.latLong) {
      return -1;
   }
   const dist = getDistanceFromLatLngInKm(home, fix.latLong);
   return Math.round(dist * kmToMiles);
}

function futureFixtures(fixtures: Fixture[]): Fixture[] {
   return fixtures.filter(fix => {
      const d = new Date(fix.date);
      return isToday(d) || isFuture(d);
   });
}
