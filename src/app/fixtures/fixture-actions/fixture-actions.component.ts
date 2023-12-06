import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { MatLegacyMenuTrigger as MatMenuTrigger, MatLegacyMenuModule } from '@angular/material/legacy-menu';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
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
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';

@UntilDestroy( { checkProperties: true } )
@Component({
    selector: 'app-fixture-actions',
    templateUrl: './fixture-actions.component.html',
    styleUrls: ['./fixture-actions.component.scss'],
    standalone: true,
    imports: [
        MatLegacyButtonModule,
        MatLegacyMenuModule,
        MatIconModule,
        NgIf,
        ExternalLinkIconComponent,
        MatDividerModule,
        MapMenuItemsComponent,
        AddToGoogleCalendarButtonComponent,
    ],
})
export class FixtureActionsComponent implements AfterViewInit {

   @Input() fixture: Fixture;
   @Input() handset = false;
   @Input() homeLocation: LatLong;

   // TODO TEMP comment out map reservation
   mapReservationSupported = true;
   loggedIn: boolean;
   fixtureEntryDetails: FixtureEntryDetails[] = [];

   @ViewChild( MatMenuTrigger ) menu: MatMenuTrigger;

   constructor ( private afAuth: Auth,
      private router: Router,
      private usd: UserDataService,
      private es: EntryService,
      private snackBar: MatSnackBar,
      private loginSnackBar: LoginSnackbarService ) {

      authState(this.afAuth).subscribe( user => this.loggedIn = ( user !== null ) );

      this.es.fixtureEntryDetails$.subscribe( arr => {
         this.fixtureEntryDetails = arr;
      } );
   }

   ngAfterViewInit() {
      // dismiss menu on scroll to fix ios issue where menu scrolls incorrectly.
      window.addEventListener( 'scroll', () => this.menu.closeMenu(), true );
   }

   /** Open the menu from an external source */
   openMenu() {
      this.menu.openMenu();
   }

   liked(): boolean {
      const userData = this.usd.currentUserData;
      if ( userData ) {
         return userData.reminders.includes( this.fixture.id );
      } else {
         return false;
      }
   }

   async toggleReminder() {
      if ( !this.loggedIn ) {
         this.loginSnackBar.open( 'Must be logged in to like fixture' );
      } else {
         try {
            if ( this.liked() ) {
               await this.usd.removeFixtureReminder( this.fixture.id );
               this.snackBar.open( 'Event Unliked', '', { duration: 2000 } );

            } else {
               await this.usd.addFixtureReminder( this.fixture.id );
               this.snackBar.open( 'Event Liked', '', { duration: 2000 } );
            }
         } catch ( e ) {
            this.snackBar.open( 'Error encountered liking event', '', { duration: 2000 } );
            console.log( "FixtureActions: Error liking/unliking event  " + e.message );
         }
      }
   }

   hasMapReservation(): boolean {
      return this.fixtureEntryDetails.filter( details => this.fixture.id === details.fixtureId ).length !== 0;
   }

   async reserveMap(): Promise<void> {
      if ( !this.loggedIn ) {
         this.loginSnackBar.open( "Must be logged in to add map reservation" );
      } else {
         this.router.navigate( ["/entry/enter", this.fixture.id] );
      }
   }

   async viewEntries() {
      this.router.navigate( ["/entry/entrylist", this.fixture.id] );
   }

   calanderlocation(): string {
      const f = this.fixture;
      let ret = "";

      f.area ? ret += f.area : ret;
      f.nearestTown ? ret += ", " + f.nearestTown : ret;
      return ret;
   }

   calanderDetails(): string {
      const f = this.fixture;
      let ret = f.name;
      
      f.club ? ret += "%0D%0AClub: " + f.club : ret;
      f.area ? ret += "%0D%0AArea: " + f.area : ret;
      f.postcode ? ret += "%0D%0APost code: " + f.postcode : ret;
      f.grade ? ret += "%0D%0AGrade: " + f.grade : ret;
      return ret;
   }

   fixtureDate(): Date {
      return new Date(this.fixture.date);
   }

   mapView() {
      this.router.navigate( ["/mapviewer"], { queryParams: { rgdata: JSON.stringify(this.fixture.rg)}  }  );
   }
}
