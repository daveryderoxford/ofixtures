import { ChangeDetectionStrategy, Component, OnInit, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { NavigationStart, Router, RouterOutlet } from "@angular/router";
import { filter, map } from 'rxjs/operators';
import { SidenavMenu } from './app-sidenav-menu/sidenav-menu';
import { FixturesService } from './fixtures/@store/fixtures.service';
import { LazyInject } from './shared/services/lazy-injector';
import { SidenavService } from './shared/services/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [MatSidenavModule, RouterOutlet, SidenavMenu],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private sidebarService = inject(SidenavService);
  private lazyInject = inject(LazyInject);
  private fixtureService = inject(FixturesService);
  private router = inject(Router);

  readonly sidenav = viewChild.required(MatSidenav);

  loading = toSignal(this.router.events.pipe(
    filter(event => event instanceof NavigationStart),
    map(event => (event instanceof NavigationStart) ? true : false),
  ), { initialValue: false });

  firstWarning = true;

  async ngOnInit() {

    this.sidebarService.setSidenav(this.sidenav());
    await this.cookieConsent();
    await this.postcodeWarning();
  }

  closeSidenav() {
    this.sidebarService.close();
  }

  private async cookieConsent() {

    if (!existsInLocalStorage('cookieConsent')) {
      const snackBar = await this.lazyInject.getProvider(() => import('@angular/material/snack-bar'), 'MatSnackBar');

      snackBar.open("This site uses cookies for analytics purposes.", "Accept").afterDismissed().subscribe(() => {
        saveToLocalStorage('cookieConsent', true);
      });
    }
  }

  /* Display a warning if the postcode is set to the default */
  private async postcodeWarning() {
    if (!existsInLocalStorage('postCodeWarning') &&
      this.fixtureService.postcode() === FixturesService.DEFAULT_POSTCODE &&
      this.firstWarning) {
      const dialog = await this.lazyInject.getProvider(() => import('@angular/material/dialog'), 'MatDialog');
      const { PostcodeDialogComponent } = await import('./fixtures/postcode/postcode-dialog/postcode-dialog.component');
      const dialogRef = dialog.open(PostcodeDialogComponent, {
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
