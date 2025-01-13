import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { AngularSplitModule } from 'angular-split';
import { AuthService } from 'app/auth/auth.service';
import { EntryService } from 'app/entry/entry.service';
import { LeagueService } from 'app/league/league-service';
import { Fixture } from 'app/model';
import { FixtureFilter } from 'app/model/fixture-filter';
import { map } from 'rxjs';
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
import { ControlPanelComponent } from './control-panel.component';

type MobileView = 'map' | 'grid';

@Component({
   selector: 'app-fixtures',
   templateUrl: './fixtures.component.html',
   styleUrls: ['./fixtures.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [NgLetDirective, FixtureSearchComponent, SidenavButtonComponent, PostcodeComponent, FixturesOptionsComponent, AngularSplitModule, FixturesMapComponent, LeagueHeaderComponent, FixturesGridComponent, FlexModule, ToolbarComponent, MatButtonModule, MatIconModule, MatDividerModule, AsyncPipe, ControlPanelComponent]
})

export class FixturesComponent implements OnInit {

   protected auth = inject(AuthService);
   public fs = inject(FixturesService);
   public ls = inject(LeagueService);
   private es = inject(EntryService);
   private breakpointObserver = inject(BreakpointObserver);
   public dialog = inject(MatDialog);
   public snackbar = inject(MatSnackBar);
   public route = inject(ActivatedRoute);

   homeLocation = toSignal(this.fs.homeLocation$, { requireSync: true });
   postcode = toSignal(this.fs.postcode$, { requireSync: true });
   filter = toSignal(this.fs.filter$, { requireSync: true });

   selectedFixture = toSignal(this.fs.selectedFixture$, { initialValue: null });

   entries = toSignal(this.es.fixtureEntryDetails$, { initialValue: [] });
   userEntries = toSignal(this.es.userEntries$, { initialValue: [] });

   selectedLeague = toSignal(this.ls.selected$, { requireSync: true });
   allFixtures = toSignal(this.fs.allFixtues(), { initialValue: [] });
   filteredFixtures = toSignal(this.fs.getFixtures(), { initialValue: [] });

   fixtures = computed(() => {
      const league = this.selectedLeague();
      if (league) {
         return this.allFixtures().filter(fix => league?.fixtureIds.includes(fix.id));
      } else {
         return this.filteredFixtures();
      }
   });

   zoomBounds = computed(() => this.selectedLeague() !== null);

   mobileView = signal<MobileView>('grid');

   showMobleFilter = signal(false);

   handset = toSignal(this.breakpointObserver.observe(['(min-width: 500px) and (min-height: 400px)']).pipe(
      map(state => !state.matches)
   ), { initialValue: false });

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
      this.showMobleFilter.set(!this.showMobleFilter());
   }
}
