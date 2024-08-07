import { BreakpointObserver } from '@angular/cdk/layout';

import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Auth, User, authState } from '@angular/fire/auth';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from "@angular/router";
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { first, tap } from 'rxjs/operators';
import { FixturesService } from './fixtures/fixtures.service';
import { PostcodeDialogComponent } from './fixtures/postcode/dialog/postcode-dialog/postcode-dialog.component';
import { LeagueMenuComponent } from './league/league-menu/league-menu.component';
import { LeagueService } from './league/league-service';
import { League } from './model/league';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { LoginSnackbarService } from './shared/services/login-snackbar.service';
import { SidenavService } from './shared/services/sidenav.service';

@UntilDestroy()
@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['app.component.scss'],
   standalone: true,
   imports: [SpinnerComponent, MatSidenavModule, MatDividerModule, MatListModule, LeagueMenuComponent, RouterOutlet]

})
export class AppComponent implements OnInit {
      private router = inject(Router);
      private afAuth = inject(Auth);
      private fixtureService = inject(FixturesService);
      private sidebarService = inject(SidenavService);
      private snackBar = inject(MatSnackBar);
      private loginSnackBar = inject(LoginSnackbarService);
      private breakpointObserver = inject(BreakpointObserver);
      private ls = inject(LeagueService);
      private dialog = inject(MatDialog);
   @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;

   loading = false;
   authorised = false;
   user: User;
   handset = false;
   firstWarning = true;

   constructor() {

      // Send google analytics message when navigating to any route succeeds.
      this.router.events.subscribe(event => {
         this.setLoading(event);
      });
   }

   ngOnInit() {

      this.breakpointObserver.observe(['(min-width: 500px) and (min-height: 400px)'])
         .pipe(
            untilDestroyed(this),
            tap(state => console.log('AppComponnet: state: ' + state.matches.toString()))
         )
         .subscribe(state => this.handset = !state.matches);

      authState(this.afAuth)
         .pipe(untilDestroyed(this))
         .subscribe((user: User) => {
            this.authorised = (user !== null);
            this.user = user;
         });

      this.sidebarService.setSidenav(this.sidenav);
      this.cookieConsent();
      this.postcodeWarning();
   }

   private cookieConsent() {
      const ConsentCookie = "CookieConsent";

      if (!existsInLocalStorage('cookieConsent')) {
         this.snackBar.open("This site uses cookies for analytics purposes.", "Accept").afterDismissed().subscribe(() => {
            saveToLocalStorage('cookieConsent', true)
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
               saveToLocalStorage('postCodeWarning', true)
               this.firstWarning = false;
            });
         }
      })
   }

   private setLoading(routerEvent: Event): void {
      if (routerEvent instanceof NavigationStart) {
         this.loading = true;
      }

      if (routerEvent instanceof NavigationEnd ||
         routerEvent instanceof NavigationCancel ||
         routerEvent instanceof NavigationError) {
         this.loading = false;
      }
   }

   async closeSidenav(target: Array<any>) {
      this.sidenav.close();
      if (target) {
         this.router.navigate(target);
      }
   }

   async adminMenu() {
      if (!this.authorised) {
         await this.sidenav.close();
         this.loginSnackBar.open('Must be logged in manage fixtures/leagues');
      } else {
         await this.router.navigate(['/admin']);
         await this.sidenav.close();
      }
   }

   async showFixtures(mapView: boolean) {
      this.ls.setSelected(null);
      if (mapView) {
         this.router.navigate(["/fixtures", { mapview: true }]);
      } else {
         this.router.navigate(["/fixtures"]);
      }
      this.sidenav.close();
   }

   async leagueSelected(l: League) {
      await this.sidenav.close();
      await this.router.navigate(["/fixtures"]);
   }

   async contact() {
      await this.sidenav.close();
      window.location.href = "mailto:support@ofixtures.co.uk";
   }

   async logout() {
      // navigate away from protected pages
      if (this.router.url.includes("admin")) {
         await this.router.navigate(["/"]);
      }
      await this.afAuth.signOut();
      await this.sidenav.close();
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
      } catch (e) {
         console.log('App component: Error saving to local storage Key: ' + key + '   ' + e.message);
      }
   }
}

function existsInLocalStorage(key: LocalStorageKey): boolean {
   try {
      const str = localStorage.getItem(key);
      return str !== null;
   } catch (e) {
      console.log('App component: Error reading from local storage.  Key: ' + key + '   ' + e.message);
      return false;
   }
}
