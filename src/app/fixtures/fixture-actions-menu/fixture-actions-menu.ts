import { AfterViewInit, ChangeDetectionStrategy, Component, computed, inject, input, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { EntryService } from 'app/entry/@store/entry.service';
import { Fixture, LatLong } from 'app/fixtures/@store/fixture';
import { LoginSnackbarService } from 'app/shared/services/login-snackbar.service';
import { ExternalLinkIcon } from '../../shared/components/external-link-icon';
import { AddToGoogleCalendarButtonComponent } from './google-cal-button';
import { MapMenuItems } from './map-menu-items';
import { UserDataService } from 'app/user/@store/user-data.service';

@Component({
   selector: 'app-fixture-actions-menu',
   templateUrl: './fixture-actions-menu.html',
   styleUrls: ['./fixture-actions-menu.scss'],
   imports: [
      MatButtonModule,
      MatMenuModule,
      MatIconModule,
      ExternalLinkIcon,
      MatDividerModule,
      MapMenuItems,
      AddToGoogleCalendarButtonComponent
   ],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixtureActionsMenu implements AfterViewInit {
   protected afAuth = inject(AuthService);
   private router = inject(Router);
   private usd = inject(UserDataService);
   private es = inject(EntryService);
   private snackBar = inject(MatSnackBar);
   private loginSnackBar = inject(LoginSnackbarService);

   fixture = input.required<Fixture>();
   handset = input(false);
   homeLocation = input.required<LatLong>();

   // TODO TEMP comment out map reservation
   fixtureEntryDetails = toSignal(this.es.fixtureEntryDetails$, { initialValue: [] });

   liked = computed(() => {
      const userData = this.usd.userdata();
      if (userData) {
         return userData.reminders.includes(this.fixture().id);
      } else {
         return false;
      }
   });

   hasMapReservation = computed(() => {
      const fixtureEntryDetails = this.fixtureEntryDetails();
      const fixture = this.fixture();

      return fixtureEntryDetails.filter(details => fixture.id === details.fixtureId).length !== 0;
   });

   calanderlocation = computed(() => {
      const f = this.fixture();
      let ret = "";

      f.area ? ret += f.area : ret;
      f.nearestTown ? ret += ", " + f.nearestTown : ret;
      return ret;
   });

   calanderDetails = computed(() => {
      const f = this.fixture();
      let ret = f.name;

      f.club ? ret += "%0D%0AClub: " + f.club : ret;
      f.area ? ret += "%0D%0AArea: " + f.area : ret;
      f.postcode ? ret += "%0D%0APost code: " + f.postcode : ret;
      f.grade ? ret += "%0D%0AGrade: " + f.grade : ret;
      return ret;
   });

   fixtureDate = computed(() => new Date(this.fixture().date));

   readonly menu = viewChild.required(MatMenuTrigger);

   ngAfterViewInit() {
      // dismiss menu on scroll to fix ios issue where menu scrolls incorrectly.
      window.addEventListener('scroll', () => this.menu().closeMenu(), true);
   }

   /** Open the menu from an external source */
   openMenu() {
      this.menu().openMenu();
   }

   async toggleReminder() {
      if (!this.afAuth.loggedIn()) {
         this.loginSnackBar.open('Must be logged in to like fixture');
      } else {
         try {
            if (this.liked()) {
               await this.usd.removeFixtureReminder(this.fixture().id);
               this.snackBar.open('Event Unliked', '', { duration: 2000 });

            } else {
               await this.usd.addFixtureReminder(this.fixture().id);
               this.snackBar.open('Event Liked', '', { duration: 2000 });
            }
         } catch (e: any) {
            this.snackBar.open('Error encountered liking event', '', { duration: 2000 });
            console.log("FixtureActions: Error liking/unliking event  " + e.message);
         }
      }
   }

   async reserveMap(): Promise<void> {
      if (!this.afAuth.loggedIn()) {
         this.loginSnackBar.open("Must be logged in to add map reservation");
      } else {
         this.router.navigate(["/entry/enter", this.fixture().id]);
      }
   }

   async viewEntries() {
      this.router.navigate(["/entry/entrylist", this.fixture().id]);
   }
   
   mapView() {
      this.router.navigate(["/mapviewer"], { queryParams: { rgdata: JSON.stringify(this.fixture().rg) } });
   }
}
