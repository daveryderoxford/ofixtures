import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Auth, User, authState } from '@angular/fire/auth';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { EntryService } from 'app/entry/entry.service';
import { Fixture } from 'app/model';
import { Entry, FixtureEntryDetails } from 'app/model/entry';
import { LatLong } from 'app/model/fixture';
import { FixtureFilter } from 'app/model/fixture-filter';
import { Observable } from 'rxjs';
import { FixturesService } from '../fixtures.service';
import { LeagueService } from 'app/league/league-service';
import { map, switchMap } from 'rxjs/operators';
import { League } from 'app/model/league';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { ToolbarComponent } from '../../shared/components/toolbar.component';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { FixturesGridComponent } from '../fixtures-grid/fixtures-grid.component';
import { LeagueHeaderComponent } from '../../league/league-header/league-header.component';
import { FixturesMapComponent } from '../fixtures-map/fixtures-map.component';
import { AngularSplitModule } from 'angular-split';
import { FixturesOptionsComponent } from '../fixtures-options/fixtures-options.component';
import { PostcodeComponent } from '../postcode/postcode.component';
import { SidenavButtonComponent } from '../../shared/components/sidenav-button.component';
import { NgLetDirective } from '../../shared/components/ngLetDirective';
import { AsyncPipe } from '@angular/common';
import { FixtureSearchComponent } from '../fixtures-search/fixture-search.component';

@UntilDestroy( { checkProperties: true } )
@Component({
    selector: 'app-fixtures',
    templateUrl: './fixtures.component.html',
    styleUrls: ['./fixtures.component.scss'],
    standalone: true,
   imports: [NgLetDirective, FixtureSearchComponent, SidenavButtonComponent, PostcodeComponent, FixturesOptionsComponent, AngularSplitModule, FixturesMapComponent, LeagueHeaderComponent, FixturesGridComponent, FlexModule, ToolbarComponent, MatLegacyButtonModule, MatIconModule, MatDividerModule, AsyncPipe]
})

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
   zoomBounds = false;

   currentRow: number;

   constructor (
      private auth: Auth,
      public fs: FixturesService,
      public ls: LeagueService,
      private es: EntryService,
      private breakpointObserver: BreakpointObserver,
      public dialog: MatDialog,
      public snackbar: MatSnackBar,
      public route: ActivatedRoute
   ) {

      this.fs.selectedFixture$.subscribe( fix => this.selectedFixture = fix);
   }

   leagueFixtures$( league: League ): Observable<Fixture[]>  {
      return this.fs.allFixtues().pipe(
         map( fixtures => fixtures.filter( fix => league?.fixtureIds.includes( fix.id ) ) )
      )
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

      this.homeLocation$ = this.fs.homeLocation$;
      this.postcode$ = this.fs.postcode$;
      this.entries$ = this.es.fixtureEntryDetails$;
      this.userEntries$ = this.es.userEntries$;

      this.fixtures$ = this.ls.selected$.pipe(
         switchMap( league => {
            if (league) {
               this.zoomBounds = true;
               return this.leagueFixtures$(league);
            } else {
               this.zoomBounds = false;
               return this.fs.getFixtures();

            }
         })
      ) 

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
      this.fs.setSelectedFixture( fixture );
   }

   async postcodeChanged( p: string ) {
      const latlong = await this.fs.setPostcode( p );
      if ( !latlong ) {
         this.snackbar.open( 'Lat/Long for postcode could not be determined.', '', { duration: 2 * 1000 } );
      }
   }

   filterChanged( f: FixtureFilter ) {
      this.fs.setFilter( f );
   }

   toggleMobileFilter() {
      this.hideMobleFilter = !this.hideMobleFilter;
   }
}
