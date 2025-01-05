import { Component, output, inject } from '@angular/core';
import { League } from 'app/model/league';
import { map } from 'rxjs/operators';
import { LeagueService } from '../league-service';
import { MatDividerModule } from '@angular/material/divider';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
    selector: 'app-league-menu',
    templateUrl: './league-menu.component.html',
    styleUrls: ['./league-menu.component.scss'],
    imports: [MatExpansionModule, MatListModule, MatDividerModule, AsyncPipe, DatePipe]
})
export class LeagueMenuComponent {
  private ls = inject(LeagueService);


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

  selectLeague( league: League ) {
    this.selected.emit( league ); 
    this.ls.setSelected( league );
  }

;
}
