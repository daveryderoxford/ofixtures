import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { League } from 'app/model/league';
import { LeagueService } from '../league-service';
import { MatButtonModule } from '@angular/material/button';

import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { MatToolbarModule } from '@angular/material/toolbar';
import { input } from "@angular/core";

@Component({
    selector: 'app-league-header',
    templateUrl: './league-header.component.html',
    styleUrls: ['./league-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatToolbarModule, FlexModule, MatButtonModule]
})
export class LeagueHeaderComponent  {

  constructor ( public ls: LeagueService ) { }

  league = input<League>();
;
}
