import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Auth, User, authState } from '@angular/fire/auth';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from "@angular/router";
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs/operators';
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
   imports: [CommonModule, SpinnerComponent, MatSidenavModule, MatDividerModule, MatListModule, LeagueMenuComponent, RouterOutlet]

})
export class AppComponent implements OnInit {

   @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;

   loading = false;
   authorised = false;
   user: User;
   handset = false;

   constructor(private router: Router,
      private afAuth: Auth,
      private sidebarService: SidenavService,
      private snackBar: MatSnackBar,
      private loginSnackBar: LoginSnackbarService,
      private breakpointObserver: BreakpointObserver,
      private ls: LeagueService
   ) {

      // Send google analytics message when navigating to any route succeeds.
      this.router.events.subscribe(event => {
         this.reportAnalytics(event);
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
   }

   private cookieConsent() {
      const ConsentCookie = "CookieConsent";

      if (!this.readCookie(ConsentCookie)) {
         this.snackBar.open("This site uses cookies for analytics purposes.", "Accept").afterDismissed().subscribe(() => {
            document.cookie = ConsentCookie + "=true";
         });
      }
   }

   private readCookie(name: string) {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');

      for (const c of ca) {
         if (c.trim().indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
         }
      }
      return null;
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

   private reportAnalytics(event: Event) {
      if (event instanceof NavigationEnd) {
         (<any>window).ga('set', 'page', event.urlAfterRedirects);
         (<any>window).ga('send', 'pageview');
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
