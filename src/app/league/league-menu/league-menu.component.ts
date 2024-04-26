import { Component, output } from '@angular/core';
import { League } from 'app/model/league';
import { map } from 'rxjs/operators';
import { LeagueService } from '../league-service';
import { MatDividerModule } from '@angular/material/divider';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatLegacyListModule } from '@angular/material/legacy-list';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
    selector: 'app-league-menu',
    templateUrl: './league-menu.component.html',
    styleUrls: ['./league-menu.component.scss'],
    standalone: true,
    imports: [MatExpansionModule, MatLegacyListModule, MatDividerModule, AsyncPipe, DatePipe]
})
export class LeagueMenuComponent {

  selected = output<League>();

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
    this.selected.emit( league ); 
    this.ls.setSelected( league );
  }

;
}
