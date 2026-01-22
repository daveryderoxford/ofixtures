import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Fixture } from 'app/fixtures/@store/fixture';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginSnackbarService } from 'app/shared/services/login-snackbar.service';
import { AuthService } from 'app/auth/auth.service';
import { UserDataService } from 'app/user/@store/user-data.service';

@Component({
  selector: 'app-liked-icon',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  template: `
    @if (!handset()) {
      <button mat-icon-button matTooltip="Like/Unlike fixture" (click)="toggleReminder(fixture())">
        <mat-icon [class.red]="liked()">favorite</mat-icon>
      </button>
    } @else {
        @if (liked()) {
          <mat-icon class="red handset">favorite</mat-icon>
      }
    }
  `,
  styles: `
    .red {
      color: red;
    }
    .handset {
       transform: scale(0.8);
    }
    mat-icon {
      color: rgb(180, 180, 180);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LikedIcon {

  usd = inject(UserDataService);
  loginSnackBar = inject(LoginSnackbarService);
  snackBar = inject(MatSnackBar);
  auth = inject(AuthService);

  loggedIn = input.required<boolean>();
  fixture = input.required<Fixture>();
  handset = input<boolean>(false);

  likedEvents = computed(() => this.usd.userdata() ? this.usd.userdata()!.reminders : []);

  liked = computed(() => this.likedEvents().includes(this.fixture().id));

  protected async toggleReminder(fixture: Fixture) {
    if (!this.loggedIn()) {
      this.loginSnackBar.open('Must be logged in to like fixture');
    } else {
      try {
        if (this.liked()) {
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
}