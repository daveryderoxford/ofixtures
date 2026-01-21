import { Directive, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { ClubService } from 'app/club/@store/club-service';
import { EntryService } from 'app/entry/@store/entry.service';
import { FixtureFilter } from 'app/fixtures/@store/fixture-filter';
import { LeagueService } from 'app/league/@store/league-service';
import { BreakpointService } from 'app/shared/services/breakpoint.service';
import { FilteredFixtures } from '../@store/filtered-fixtures';
import { Fixture } from '../@store/fixture';
import { FixturesService } from '../@store/fixtures.service';
import { SelectedFixture } from '../@store/selected-fixture';

@Directive()
export abstract class FixturesBaseComponent {

   protected auth = inject(AuthService);
   public fs = inject(FixturesService);
   public filtered = inject(FilteredFixtures);
   public selection = inject(SelectedFixture);
   public ls = inject(LeagueService);
   public cs = inject(ClubService);
   private es = inject(EntryService);
   protected breakpointObserver = inject(BreakpointService);
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

   gridFixtureSelected(fixture: Fixture) {
      this.selection.setSelectedFixture(fixture);
   }

   mapFixtureSelected(fixture: Fixture) {
      this.selection.setSelectedFixture(fixture);
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
}