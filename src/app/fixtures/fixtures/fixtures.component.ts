import { ChangeDetectionStrategy, Component, OnInit, computed, inject, input, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { AngularSplitModule } from 'angular-split';
import { AuthService } from 'app/auth/auth.service';
import { ClubService } from 'app/club/@store/club-service';
import { EntryService } from 'app/entry/@store/entry.service';
import { LeagueService } from 'app/league/@store/league-service';
import { FixtureFilter } from 'app/fixtures/@store/fixture-filter';
import { BreakpointService } from 'app/shared/services/breakpoint.service';
import { LeagueHeaderComponent } from '../../league/league-header/league-header.component';
import { SidenavButtonComponent } from '../../shared/components/sidenav-button.component';
import { ToolbarComponent } from '../../shared/components/toolbar.component';
import { FixturesGridComponent } from '../fixtures-grid/fixtures-grid.component';
import { FixturesMapComponent } from '../fixtures-map/fixtures-map.component';
import { FixturesOptionsComponent } from '../fixtures-options/fixtures-options.component';
import { FixtureSearchComponent } from '../fixtures-search/fixture-search.component';
import { FixturesService } from '../@store/fixtures.service';
import { PostcodeComponent } from '../postcode/postcode.component';
import { ControlPanelComponent } from './control-panel.component';
import { FilteredFixtures } from '../@store/filtered-fixtures';
import { SelectedFixture } from '../@store/selected-fixture';
import { Fixture } from '../@store/fixture';

type MobileView = 'map' | 'grid';

@Component({
   selector: 'app-fixtures',
   templateUrl: './fixtures.component.html',
   styleUrls: ['./fixtures.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [FixtureSearchComponent, SidenavButtonComponent, PostcodeComponent, FixturesOptionsComponent, 
      AngularSplitModule, FixturesMapComponent, LeagueHeaderComponent, FixturesGridComponent, FlexModule, 
      ToolbarComponent, MatButtonModule, MatIconModule, MatDividerModule, ControlPanelComponent, 
      MatTooltipModule, MatProgressSpinnerModule]
})

export class FixturesComponent implements OnInit {

   protected auth = inject(AuthService);
   public fs = inject(FixturesService);
   public filtered = inject(FilteredFixtures);
   public selection = inject(SelectedFixture);
   public ls = inject(LeagueService);
   public cs = inject(ClubService);
   private es = inject(EntryService);
   private breakpointObserver = inject(BreakpointService);
   public dialog = inject(MatDialog);
   public snackbar = inject(MatSnackBar);
   public route = inject(ActivatedRoute);

   homeLocation = this.fs.homeLocation;
   postcode = this.fs.postcode;
   filter = this.filtered.filter;

   selectedFixture = this.selection.selectedFixture;

   entries = toSignal(this.es.fixtureEntryDetails$, { initialValue: [] });
   userEntries = toSignal(this.es.userEntries$, { initialValue: [] });

   filteredFixtures = this.filtered.fixtures;

   clubName = input<string | undefined>(undefined, {alias: 'club'}) // route parameter
   leagueId = input<string | undefined>(undefined, {alias: 'league' }) // route parameter

   league = computed(() => this.ls.findById(this.leagueId()));

   club = computed(() => this.cs.find(this.clubName()));

   fixtureGroup = computed( () => {
      if (this.leagueId()) return this.league();
      if (this.club()) return this.club();
      return undefined;
   });

   fixtures = computed(() => {
      if (this.league()) {
         return this.fs.fixtures().filter(fix => this.league()?.fixtureIds.includes(fix.id));
      } else if (this.club()) {
         return this.fs.fixtures().filter(fix => fix.club === this.club()?.name);
      } else {
         return this.filteredFixtures();
      }
   });

   loading = computed(() => this.fs.loading() || this.ls.leagues.isLoading() );

   displayedSelection = computed(() => {
      const f = this.fixtures().find(fix => fix.id === this.selectedFixture()?.id);
      return f;
   });

   zoomBounds = computed(() => this.league() !== undefined || this.club() !== undefined);

   mobileView = signal<MobileView>('grid');

   showMobleFilter = signal(false);

   handset = this.breakpointObserver.handset;

   grid = viewChild.required(FixturesGridComponent);

   ngOnInit() {

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

   gridFixtureSelected(fixture: Fixture) {
      this.selection.setSelectedFixture(fixture);
   }

   mapFixtureSelected(fixture: Fixture) {
      this.selection.setSelectedFixture(fixture);
      this.grid().scrollToFixture(fixture);
   }


   async postcodeChanged(p: string) {
      const latlong = await this.fs.setPostcode(p);
      if (!latlong) {
         this.snackbar.open('Lat/Long for postcode could not be determined.', '', { duration: 2 * 1000 });
      }
   }

   filterChanged(f: FixtureFilter) {
      this.filtered.setFilter(f);
   }

   mobileGridView() {
      this.mobileView.set('grid');
      if (this.selectedFixture()) {
         this.grid().scrollToFixture(this.selectedFixture()!);
      }
   }

   toggleMobileFilter() {
      this.showMobleFilter.set(!this.showMobleFilter());
   }
}
