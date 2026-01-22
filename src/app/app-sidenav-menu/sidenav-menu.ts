
import { Component, inject, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { RouteState } from 'app/app.route-state';
import { AuthService } from 'app/auth/auth.service';
import { SelectClub } from 'app/club/select-club';
import { League } from 'app/league/@store/league';
import { LeagueMenu } from 'app/league/league-menu/league-menu';
import { BreakpointService } from 'app/shared/services/breakpoint.service';
import { LoginSnackbarService } from 'app/shared/services/login-snackbar.service';

@Component({
  selector: 'app-sidenav-menu',
  imports: [MatListModule, MatDividerModule, LeagueMenu, SelectClub, RouterModule, MatButtonModule],
  templateUrl: './sidenav-menu.html',
  styles: ''
})
export class SidenavMenu {
  private router = inject(Router);
  protected auth = inject(AuthService);
  private loginSnackBar = inject(LoginSnackbarService);
  protected layout = inject(BreakpointService);
  protected routeState = inject(RouteState);

  readonly close = output();

  async closeSidenav(target: Array<any>) {
    this.close.emit();
    if (target) {
      this.router.navigate(target);
    }
  }

  async adminMenu() {
    if (!this.auth.loggedIn()) {
      this.close.emit();
      this.loginSnackBar.open('Must be logged in manage fixtures/leagues');
    } else {
      await this.router.navigate(['/admin']);
      await this.close.emit();
    }
  }

  async showFixtures(mapView: boolean) {
    if (mapView) {
      this.router.navigate(["/fixtures", { mapview: true }]);
    } else {
      this.router.navigate(["/fixtures"]);
    }
    this.close.emit();
  }

  async leagueSelected(l: League) {
    this.close.emit();
    await this.router.navigate(
      ["/fixtures"],
      { queryParams: { league: l.id } }
    );
  }

  async clubSelected(clubName: string) {
    await this.close.emit();
    await this.router.navigate(
      ["/fixtures"],
      { queryParams: { club: clubName } }
    );
  }

  async contact() {
    this.close.emit();
    window.location.href = "mailto:support@ofixtures.co.uk";
  }

  async logout() {
    // navigate away from protected pages
    if (this.router.url.includes("admin")) {
      await this.router.navigate(["/"]);
    }
    await this.auth.signOut();
    this.close.emit();
  }

}