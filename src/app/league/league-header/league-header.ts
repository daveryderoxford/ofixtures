import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { League } from 'app/league/@store/league';
import { LeagueService } from '../@store/league-service';
import { input } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { Club } from 'app/club/@store/club';
import { Router } from '@angular/router';

@Component({
    selector: 'app-league-header',
    template: `
    <mat-toolbar>
       {{league().name}}
       <span fxFlex></span>
       @if (league().url) {
          <a mat-button href="{{league().url}}">Website</a>
       }
      <button mat-button (click)="clear()">Clear</button>
      </mat-toolbar>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatToolbarModule, FlexModule, MatButtonModule]
})
export class LeagueHeader  {
  ls = inject(LeagueService);
  router = inject(Router);

  league = input.required<League | Club>();

  clear() {
    this.router.navigate(["/fixtures"]);
  }
}
