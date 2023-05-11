import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { League } from 'app/model/league';
import { LeagueService } from '../league-service';

@Component({
  selector: 'app-league-header',
  templateUrl: './league-header.component.html',
  styleUrls: ['./league-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeagueHeaderComponent  {

  constructor ( public ls: LeagueService ) { }

  @Input() league: League;

}
