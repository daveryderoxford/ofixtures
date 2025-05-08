import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, output, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ExtendedModule } from '@ngbracket/ngx-layout/extended';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { Fixture } from 'app/model';
import { Entry, FixtureEntryDetails } from 'app/model/entry';
import { LatLong, RGData } from 'app/model/fixture';
import { LoginSnackbarService } from 'app/shared/services/login-snackbar.service';
import { UserDataService } from 'app/user/user-data.service';
import { isSameDay } from "date-fns";
import { ExternalLinkIconComponent } from '../../shared/components/external-link-icon.component';
import { EllipsisPipe } from '../../shared/pipes/ellipsis-pipe';
import { EnterButtonComponent } from '../enter-button/enter-button.component';
import { FixtureActionsComponent } from '../fixture-actions/fixture-actions.component';
import { MapMenuItemsComponent } from '../fixture-actions/map-menu-items.component';
import { FixtureDatePipe, FixtureDistanceColorPipe, FixtureDistancePipe, GradeIconNamePipe, LocationPipe } from '../fixture-pipes';

interface StyledFixture extends Fixture {
   shaded?: boolean;
}

@Component({
   selector: 'app-fixtures-grid',
   templateUrl: './fixtures-grid.component.html',
   styleUrls: ['./fixtures-grid.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [ScrollingModule, FlexModule, NgClass, ExtendedModule, MatButtonModule, MatTooltipModule, MatIconModule, ExternalLinkIconComponent, MatMenuModule, MapMenuItemsComponent, FixtureActionsComponent, MatListModule, MatLineModule, MatDividerModule, EllipsisPipe, LocationPipe, 
      FixtureDatePipe, FixtureDistancePipe, FixtureDistanceColorPipe, GradeIconNamePipe, EnterButtonComponent]
})
export class FixturesGridComponent {
   private usd = inject(UserDataService);
   private router = inject(Router);
   private loginSnackBar = inject(LoginSnackbarService);
   private snackBar = inject(MatSnackBar);

   fixtures = input.required<Fixture[]>();
   entries = input<FixtureEntryDetails[]>([]);    // not used in mobile view so not required
   userEntries = input<Entry[]>([]);              // not used in mobile view so not required
   selectedFixture = input.required<Fixture | null>();
   homeLocation = input.required<LatLong>();
   handset = input.required<boolean>();
   loggedIn = input<boolean>(false);              // not used in mobile view so not required
   fixtureSelected = output<Fixture>();

   itemsize = computed(() => (this.handset()) ? 88 : 38);

   styledFixtures = computed(() => {
      const styled: StyledFixture[] = [...this.fixtures()];
      // Set Shaded property for date row styling
      let shaded = false;
      let previousFix = null;
      for (const fix of styled) {
         if (previousFix && !isSameDay(new Date(fix.date), new Date(previousFix.date))) {
            shaded = !shaded;
         }
         fix.shaded = shaded;
         previousFix = fix;
      }
      return styled;
   });

   likedEvents = computed(() => this.usd.userdata() ? this.usd.userdata()!.reminders : []);

   readonly viewPort = viewChild.required(CdkVirtualScrollViewport);

   constructor() {
      const iconRegistry = inject(MatIconRegistry);
      const sanitizer = inject(DomSanitizer);
      this._registerGradeIcons(iconRegistry, sanitizer);
   }

   public scrollToFixture(fixture: Fixture) {
      const index = this.fixtures().findIndex(f => f === fixture);

      if (index !== -1) {
         this.viewPort().scrollToIndex(index);
      }
   }

   protected eventClicked(row: Fixture) {
      this.fixtureSelected.emit(row);
   }

   protected isSelected(fixture: Fixture): boolean {
      if (this.selectedFixture() && fixture) {
         return this.selectedFixture()!.id === fixture.id;
      } else {
         return false;
      }
   }

   protected rowClass(fixture: StyledFixture): string {
      if (this.isSelected(fixture)) {
         return 'selected';
      } else {
         return fixture.shaded ? 'shaded' : 'white';
      }
   }

   protected trackBy(index: number, fix: Fixture) {
      return fix.id;
   }


   /** Load icons svg for event grades */
   private _registerGradeIcons(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon('grade-local',
         sanitizer.bypassSecurityTrustResourceUrl('assets/img/event_grade/grade_local.svg')
      );
      iconRegistry.addSvgIcon('grade-club',
         sanitizer.bypassSecurityTrustResourceUrl('assets/img/event_grade/grade_club.svg')
      );
      iconRegistry.addSvgIcon('grade-regional',
         sanitizer.bypassSecurityTrustResourceUrl('assets/img/event_grade/grade_regional.svg')
      );
      iconRegistry.addSvgIcon('grade-national',
         sanitizer.bypassSecurityTrustResourceUrl('assets/img/event_grade/grade_national.svg')
      );
      iconRegistry.addSvgIcon('grade-international',
         sanitizer.bypassSecurityTrustResourceUrl('assets/img/event_grade/grade_international.svg')
      );
      iconRegistry.addSvgIcon('grade-iof',
         sanitizer.bypassSecurityTrustResourceUrl('assets/img/event_grade/grade_iof.svg')
      );
   }

   protected isLiked(fixture: Fixture): boolean {
      return this.likedEvents().includes(fixture.id);
   }

   protected mapView(rg: RGData) {
      this.router.navigate(["/mapviewer"], { queryParams: { rgdata: JSON.stringify(rg) } });
   }

   // TODO temp
   protected isEntryAvalaible(fixture: Fixture): boolean {
      if (!this.entries()) {
         return false;
      }
      const index = this.entries().findIndex(entry => fixture.id === entry.fixtureId);
      return index !== -1;
   }

   protected async toggleReminder(fixture: Fixture) {
      if (!this.loggedIn()) {
         this.loginSnackBar.open('Must be logged in to like fixture');
      } else {
         try {
            if (this.isLiked(fixture)) {
               await this.usd.removeFixtureReminder(fixture.id);
               this.snackBar.open('Event Unliked', '', { duration: 2000 });
            } else {
               await this.usd.addFixtureReminder(fixture.id);
               this.snackBar.open('Event Liked', '', { duration: 2000 });
            }
         } catch (e: any) {
            this.snackBar.open('Error encountered liking event', '', { duration: 2000 });
            console.log("FixtureActions: Error liking/unliking event  " + e.message);
         }
      }
   }

   protected async enter(fixture: Fixture) {
      if (!this.loggedIn()) {
         this.loginSnackBar.open("Must be logged in to add map reservation");
      } else {
         this.router.navigate(["/entry/enter", fixture.id]);
      }
   }

   protected isEntered(fixture: Fixture): boolean {
      if (!this.userEntries()) { return false; }
      const index = this.userEntries().findIndex(entry => entry.fixtureId === fixture.id);
      return index !== -1;
   }

   protected async editEntry(fixture: Fixture) {
      this.router.navigate(["/entry/enter", fixture.id]);
   }

   protected async viewEntries(fixture: Fixture) {
      this.router.navigate(["/entry/entrylist", fixture.id]);
   }
}
