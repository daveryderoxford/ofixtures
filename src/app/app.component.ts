import { Component, OnInit, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from "@angular/router";
import { filter, map } from 'rxjs/operators';
import { SidenavMenuComponent } from './app-sidenav-menu/sidenav-menu.component';
import { FixturesService } from './fixtures/@store/fixtures.service';
import { PostcodeDialogComponent } from './fixtures/postcode/dialog/postcode-dialog/postcode-dialog.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { SidenavService } from './shared/services/sidenav.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['app.component.scss'],
   imports: [SpinnerComponent, MatSidenavModule, RouterOutlet, SidenavMenuComponent]
})
export class AppComponent implements OnInit {
   private router = inject(Router);
   private fixtureService = inject(FixturesService);
   private sidebarService = inject(SidenavService);
   private snackBar = inject(MatSnackBar);
   private dialog = inject(MatDialog);

   readonly sidenav = viewChild.required(MatSidenav);

   private navStates = [NavigationStart, NavigationEnd, NavigationCancel, NavigationError];

   loading = toSignal(this.router.events.pipe(
      filter(event => this.navStates.some(state => (event instanceof (state)))),
      map(event => (event instanceof NavigationStart) ? true : false),
   ), { initialValue: false });

   firstWarning = true;

   ngOnInit() {

      this.sidebarService.setSidenav(this.sidenav());
      this.cookieConsent();
      this.postcodeWarning();
   }

   closeSidenav() {
      this.sidebarService.close();
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
      if ( !existsInLocalStorage('postCodeWarning') && 
            this.fixtureService.postcode() === FixturesService.DEFAULT_POSTCODE && 
            this.firstWarning) {
         const dialogRef = this.dialog.open(PostcodeDialogComponent, {
            panelClass: 'sb-highzorder-dialog'
         });

         dialogRef.afterClosed().subscribe(() => {
            saveToLocalStorage('postCodeWarning', true);
            this.firstWarning = false;
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
