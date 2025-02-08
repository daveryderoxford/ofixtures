import { Component, OnInit, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from "@angular/router";
import { filter, first, map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { SelectClubComponent } from "./club/select-club.component";
import { FixturesService } from './fixtures/fixtures.service';
import { PostcodeDialogComponent } from './fixtures/postcode/dialog/postcode-dialog/postcode-dialog.component';
import { LeagueMenuComponent } from './league/league-menu/league-menu.component';
import { League } from './model/league';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { BreakpointService } from './shared/services/breakpoint.service';
import { LoginSnackbarService } from './shared/services/login-snackbar.service';
import { SidenavService } from './shared/services/sidenav.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['app.component.scss'],
   imports: [SpinnerComponent, MatSidenavModule, MatDividerModule, MatListModule, LeagueMenuComponent, RouterOutlet, SelectClubComponent]
})
export class AppComponent implements OnInit {
   private router = inject(Router);
   protected afAuth = inject(AuthService);
   private fixtureService = inject(FixturesService);
   private sidebarService = inject(SidenavService);
   private snackBar = inject(MatSnackBar);
   private loginSnackBar = inject(LoginSnackbarService);
   protected layout = inject(BreakpointService);
   private dialog = inject(MatDialog);

   readonly sidenav = viewChild.required(MatSidenav);

   private navStates = [NavigationStart, NavigationEnd, NavigationCancel, NavigationError];

   loading = toSignal(this.router.events.pipe(
      filter ( event => this.navStates.some( state => (event instanceof(state)))),
      map(event => (event instanceof NavigationStart) ? true : false),
   ), {initialValue: false});
  
   firstWarning = true;

   ngOnInit() {

      this.sidebarService.setSidenav(this.sidenav());
      this.cookieConsent();
      this.postcodeWarning();
   }

   private cookieConsent() {
      const ConsentCookie = "CookieConsent";

      if (!existsInLocalStorage('cookieConsent')) {
         this.snackBar.open("This site uses cookies for analytics purposes.", "Accept").afterDismissed().subscribe(() => {
            saveToLocalStorage('cookieConsent', true);
         });
      }
   }

   /* Display a warining on mobile if the posttcode is set to the default */
   private postcodeWarning() {
      const PostcodeCookie = "PostcodeCookie";
      this.fixtureService.postcode$.pipe(first()
      ).subscribe((pc) => {
         if (!existsInLocalStorage('postCodeWarning') && pc === FixturesService.DEFAULT_POSTCODE && this.firstWarning) {
            const dialogRef = this.dialog.open(PostcodeDialogComponent, {
               panelClass: 'sb-highzorder-dialog'
            });

            dialogRef.afterClosed().subscribe(() => {
               saveToLocalStorage('postCodeWarning', true);
               this.firstWarning = false;
            });
         }
      });
   }

   async closeSidenav(target: Array<any>) {
      this.sidenav().close();
      if (target) {
         this.router.navigate(target);
      }
   }

   async adminMenu() {
      if (!this.afAuth.loggedIn()) {
         await this.sidenav().close();
         this.loginSnackBar.open('Must be logged in manage fixtures/leagues');
      } else {
         await this.router.navigate(['/admin']);
         await this.sidenav().close();
      }
   }

   async showFixtures(mapView: boolean) {
      if (mapView) {
         this.router.navigate(["/fixtures", { mapview: true }]);
      } else {
         this.router.navigate(["/fixtures"]);
      }
      this.sidenav().close();
   }

   async leagueSelected(l: League) {
      await this.sidenav().close();
      await this.router.navigate(["/fixtures", { leagueId: l.id }]);
   }

   async clubSelected(clubName: string) {
      await this.sidenav().close();
      await this.router.navigate(["/fixtures", { clubName: clubName }]);
   }


   async contact() {
      await this.sidenav().close();
      window.location.href = "mailto:support@ofixtures.co.uk";
   }

   async logout() {
      // navigate away from protected pages
      if (this.router.url.includes("admin")) {
         await this.router.navigate(["/"]);
      }
      await this.afAuth.signOut();
      await this.sidenav().close();
   }

   // Detects if device is on iOS
   isIos(): boolean {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
   }

   isInStandaloneMode(): boolean {
      const nav: any = window.navigator;
      return ('standalone' in nav) && nav.standalone;
   }

   async showIosInstallBanner() {

      const isBannerShown = localStorage.getItem('isBannerShown');

      // Checks if it should display install popup notification
      if (this.isIos() && !this.isInStandaloneMode() && isBannerShown === undefined) {
         const snackBarRef = this.snackBar.open(`To install the app, tap "Share" icon below and select "Add to Home Screen".`);

         snackBarRef.afterDismissed().subscribe(() => {
            localStorage.setItem('isBannerShown', 'true');
         });
      }
   }
}

type LocalStorageKey = 'postCodeWarning' | 'cookieConsent';

function saveToLocalStorage(key: LocalStorageKey, data: boolean) {
   if (data) {
      try {
         localStorage.setItem(key, data.toString());
      } catch (e: any) {
         console.log('App component: Error saving to local storage Key: ' + key + '   ' + e.message);
      }
   }
}

function existsInLocalStorage(key: LocalStorageKey): boolean {
   try {
      const str = localStorage.getItem(key);
      return str !== null;
   } catch (e: any) {
      console.log('App component: Error reading from local storage.  Key: ' + key + '   ' + e.message);
      return false;
   }
}
