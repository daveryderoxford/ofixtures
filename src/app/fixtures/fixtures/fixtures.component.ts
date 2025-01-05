import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, OnInit, computed, signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, User, authState } from '@angular/fire/auth';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { AngularSplitModule } from 'angular-split';
import { EntryService } from 'app/entry/entry.service';
import { LeagueService } from 'app/league/league-service';
import { Fixture } from 'app/model';
import { FixtureFilter } from 'app/model/fixture-filter';
import { LeagueHeaderComponent } from '../../league/league-header/league-header.component';
import { NgLetDirective } from '../../shared/components/ngLetDirective';
import { SidenavButtonComponent } from '../../shared/components/sidenav-button.component';
import { ToolbarComponent } from '../../shared/components/toolbar.component';
import { FixturesGridComponent } from '../fixtures-grid/fixtures-grid.component';
import { FixturesMapComponent } from '../fixtures-map/fixtures-map.component';
import { FixturesOptionsComponent } from '../fixtures-options/fixtures-options.component';
import { FixtureSearchComponent } from '../fixtures-search/fixture-search.component';
import { FixturesService } from '../fixtures.service';
import { PostcodeComponent } from '../postcode/postcode.component';

@Component({
    selector: 'app-fixtures',
    templateUrl: './fixtures.component.html',
    styleUrls: ['./fixtures.component.scss'],
    imports: [NgLetDirective, FixtureSearchComponent, SidenavButtonComponent, PostcodeComponent, FixturesOptionsComponent, AngularSplitModule, FixturesMapComponent, LeagueHeaderComponent, FixturesGridComponent, FlexModule, ToolbarComponent, MatButtonModule, MatIconModule, MatDividerModule, AsyncPipe]
})

export class FixturesComponent implements OnInit {
      private auth = inject(Auth);
      public fs = inject(FixturesService);
      public ls = inject(LeagueService);
      private es = inject(EntryService);
      private breakpointObserver = inject(BreakpointObserver);
      public dialog = inject(MatDialog);
      public snackbar = inject(MatSnackBar);
      public route = inject(ActivatedRoute);
   homeLocation = toSignal(this.fs.homeLocation$);
   postcode = toSignal(this.fs.postcode$);
   filter = toSignal(this.fs.filter$);

   selectedFixture = toSignal(this.fs.selectedFixture$);

   entries = toSignal(this.es.fixtureEntryDetails$);
   userEntries = toSignal(this.es.userEntries$);

   selectedLeague = toSignal(this.ls.selected$);
   allFixtures = toSignal(this.fs.allFixtues());
   filteredFixtures = toSignal(this.fs.getFixtures());

   fixtures = computed(() => {
      const league = this.selectedLeague();
      if (league) {
         return this.allFixtures().filter(fix => league?.fixtureIds.includes(fix.id));
      } else {
         return this.filteredFixtures();
      }
   });

   zoomBounds = computed(() => this.selectedLeague() !== null);

   hideMobleFilter = signal(true);

   handset = false;
   mapview = false;
   loggedIn: boolean;

   currentRow: number;

   ngOnInit() {

      this.breakpointObserver.observe(['(min-width: 500px) and (min-height: 400px)']).subscribe(state => {
         this.handset = !state.matches;
         if (this.handset) {
            this.mapview = false;
         }
      });

      this.route.paramMap.subscribe((params: ParamMap) => {
         this.mapview = params.has('mapview');
      });

      authState(this.auth).subscribe((user: User) => {
         this.loggedIn = (user !== null);
      });


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

   onFixtureSelected(fixture: Fixture) {
      this.fs.setSelectedFixture(fixture);
   }

   async postcodeChanged(p: string) {
      const latlong = await this.fs.setPostcode(p);
      if (!latlong) {
         this.snackbar.open('Lat/Long for postcode could not be determined.', '', { duration: 2 * 1000 });
      }
   }

   filterChanged(f: FixtureFilter) {
      this.fs.setFilter(f);
   }

   toggleMobileFilter() {
      this.hideMobleFilter.set(!this.hideMobleFilter());
   }
}
