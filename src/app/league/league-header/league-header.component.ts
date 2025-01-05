import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
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
    imports: [MatToolbarModule, FlexModule, MatButtonModule]
})
export class LeagueHeaderComponent  {
  ls = inject(LeagueService);


  league = input<League>();
;
}
