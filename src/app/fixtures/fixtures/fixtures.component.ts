import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Auth, User, authState } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { EntryService } from 'app/entry/entry.service';
import { Fixture } from 'app/model';
import { Entry, FixtureEntryDetails } from 'app/model/entry';
import { LatLong } from 'app/model/fixture';
import { FixtureFilter } from 'app/model/fixture-filter';
import { Observable } from 'rxjs';
import { FixturesService } from '../fixtures.service';

@UntilDestroy( { checkProperties: true } )
@Component( {
   selector: 'app-fixtures',
   templateUrl: './fixtures.component.html',
   styleUrls: ['./fixtures.component.scss']
} )

export class FixturesComponent implements OnInit {
   selectedFixture: Fixture = null;

   homeLocation$: Observable<LatLong>;
   postcode$: Observable<string>;
   fixtures$: Observable<Fixture[]>;
   entries$: Observable<FixtureEntryDetails[]>;
   userEntries$: Observable<Entry[]>;

   hideMobleFilter = true;

   handset = false;
   mapview = false;
   loggedIn: boolean;

   currentRow: number;

   constructor (
      private auth: Auth,
      public fs: FixturesService,
      private es: EntryService,
      private breakpointObserver: BreakpointObserver,
      public dialog: MatDialog,
      public snackbar: MatSnackBar,
      public route: ActivatedRoute
   ) {

      this.fs.getSelectedFixture$().subscribe( fix => this.selectedFixture = fix);
   }

   ngOnInit() {

      this.breakpointObserver.observe( ['(min-width: 500px) and (min-height: 400px)'] ).subscribe( state => {
         this.handset = !state.matches;
         if (this.handset) {
            this.mapview = false;
         }
      });

      this.route.paramMap.subscribe( ( params: ParamMap ) => {
         this.mapview = params.has( 'mapview' );
      } );

      authState(this.auth).subscribe( ( user: User ) => {
         this.loggedIn = ( user !== null );
      } );

      this.homeLocation$ = this.fs.getHomeLocation();
      this.postcode$ = this.fs.getPostcode();
      this.fixtures$ = this.fs.getFixtures();
      this.entries$ = this.es.fixtureEntryDetails$;
      this.userEntries$ = this.es.userEntries$;

      /* Array of of entries expanded for the fixtures */
      /* this.entries$ = combineLatest([this.fixtures$, this.es.fixtureEntryDetails$]).pipe(
          map(([fixtures, entries]) =>
             fixtures.map(fix => {
                const index = entries.findIndex(details => details.fixtureId === fix.id);
                return (index === -1) ? null : entries[index];
             })),
          )
       ); */
   }

   onFixtureSelected( fixture: Fixture ) {
      this.fs.updateSelectedFixture( fixture );
   }

   async postcodeChanged( p: string ) {
      const latlong = await this.fs.updatePostcode( p );
      if ( !latlong ) {
         this.snackbar.open( 'Lat/Long for postcode could not be determined.', '', { duration: 2 * 1000 } );
      }
   }

   filterChanged( f: FixtureFilter ) {
      this.fs.updateFilter( f );
   }

   toggleMobileFilter() {
      this.hideMobleFilter = !this.hideMobleFilter;
   }
}
