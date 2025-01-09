import { AfterViewInit, Component, viewChild, inject } from '@angular/core';
import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { EntryService } from 'app/entry/entry.service';
import { FixtureEntryDetails } from 'app/model/entry';
import { Fixture, LatLong } from 'app/model/fixture';
import { LoginSnackbarService } from 'app/shared/services/login-snackbar.service';
import { UserDataService } from 'app/user/user-data.service';
import { AddToGoogleCalendarButtonComponent } from './google-cal-button';
import { MapMenuItemsComponent } from './map-menu-items.component';
import { MatDividerModule } from '@angular/material/divider';
import { ExternalLinkIconComponent } from '../../shared/components/external-link-icon.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { input } from "@angular/core";
import { AuthService } from 'app/auth/auth.service';

@UntilDestroy( { checkProperties: true } )
@Component({
    selector: 'app-fixture-actions',
    templateUrl: './fixture-actions.component.html',
    styleUrls: ['./fixture-actions.component.scss'],
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        ExternalLinkIconComponent,
        MatDividerModule,
        MapMenuItemsComponent,
        AddToGoogleCalendarButtonComponent
    ]
})
export class FixtureActionsComponent implements AfterViewInit {
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
   mapReservationSupported = true;
   fixtureEntryDetails: FixtureEntryDetails[] = [];

   readonly menu = viewChild.required(MatMenuTrigger);

   constructor () {

      this.es.fixtureEntryDetails$.subscribe( arr => {
         this.fixtureEntryDetails = arr;
      } );
   }

   ngAfterViewInit() {
      // dismiss menu on scroll to fix ios issue where menu scrolls incorrectly.
      window.addEventListener( 'scroll', () => this.menu().closeMenu(), true );
   }

   /** Open the menu from an external source */
   openMenu() {
      this.menu().openMenu();
   }

   liked(): boolean {
      const userData = this.usd.userdata();
      if ( userData ) {
         return userData.reminders.includes( this.fixture().id );
      } else {
         return false;
      }
   }

   async toggleReminder() {
      if ( !this.afAuth.loggedIn() ) {
         this.loginSnackBar.open( 'Must be logged in to like fixture' );
      } else {
         try {
            if ( this.liked() ) {
               await this.usd.removeFixtureReminder( this.fixture().id );
               this.snackBar.open( 'Event Unliked', '', { duration: 2000 } );

            } else {
               await this.usd.addFixtureReminder( this.fixture().id );
               this.snackBar.open( 'Event Liked', '', { duration: 2000 } );
            }
         } catch ( e: any ) {
            this.snackBar.open( 'Error encountered liking event', '', { duration: 2000 } );
            console.log( "FixtureActions: Error liking/unliking event  " + e.message );
         }
      }
   }

   hasMapReservation(): boolean {
      return this.fixtureEntryDetails.filter( details => this.fixture().id === details.fixtureId ).length !== 0;
   }

   async reserveMap(): Promise<void> {
      if (!this.afAuth.loggedIn() ) {
         this.loginSnackBar.open( "Must be logged in to add map reservation" );
      } else {
         this.router.navigate( ["/entry/enter", this.fixture().id] );
      }
   }

   async viewEntries() {
      this.router.navigate( ["/entry/entrylist", this.fixture().id] );
   }

   calanderlocation(): string {
      const f = this.fixture();
      let ret = "";

      f.area ? ret += f.area : ret;
      f.nearestTown ? ret += ", " + f.nearestTown : ret;
      return ret;
   }

   calanderDetails(): string {
      const f = this.fixture();
      let ret = f.name;
      
      f.club ? ret += "%0D%0AClub: " + f.club : ret;
      f.area ? ret += "%0D%0AArea: " + f.area : ret;
      f.postcode ? ret += "%0D%0APost code: " + f.postcode : ret;
      f.grade ? ret += "%0D%0AGrade: " + f.grade : ret;
      return ret;
   }

   fixtureDate(): Date {
      return new Date(this.fixture().date);
   }

   mapView() {
      this.router.navigate( ["/mapviewer"], { queryParams: { rgdata: JSON.stringify(this.fixture().rg)}  }  );
   }
}
