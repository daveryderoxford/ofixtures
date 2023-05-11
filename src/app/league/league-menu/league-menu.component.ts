import { Component } from '@angular/core';
import { League } from 'app/model/league';
import { map } from 'rxjs/operators';
import { LeagueService } from '../league-service';

@Component( {
  selector: 'app-league-menu',
  templateUrl: './league-menu.component.html',
  styleUrls: ['./league-menu.component.scss']
} )
export class LeagueMenuComponent {

  multiday$ = this.ls.leagues$.pipe(
    map( leagues => leagues.filter( l => l.type === 'Multiday' ) )
  )

  national$ = this.ls.leagues$.pipe(
    map( leagues => leagues.filter( l => l.type === 'League' && l.level === 'National' ) )
  );

  regional$ = this.ls.leagues$.pipe(
    map( leagues => leagues.filter( l => l.type === 'League' && l.level === 'Regional' ) )
  );

  club$ = this.ls.leagues$.pipe(
    map( leagues => leagues.filter( l => l.type === 'League' && l.level === 'Club' ) )
  );

  constructor ( private ls: LeagueService ) { }

  selectLeague( league: League ) {
    this.ls.setSelected( league );
  }

}
