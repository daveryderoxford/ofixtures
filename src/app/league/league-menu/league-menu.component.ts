import { DatePipe } from '@angular/common';
import { Component, computed, inject, output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { League } from 'app/model/league';
import { LeagueService } from '../league-service';

@Component({
    selector: 'app-league-menu',
    templateUrl: './league-menu.component.html',
    styleUrls: ['./league-menu.component.scss'],
    imports: [MatExpansionModule, MatListModule, MatDividerModule, DatePipe]
})
export class LeagueMenuComponent {
  private ls = inject(LeagueService);
  private router = inject(Router);

  selected = output<League>();

  multiday = computed( () => this.ls.leagues().filter( l => l.type === 'Multiday' ) );
  national = computed(() => this.ls.leagues().filter(l => l.type === 'League' && l.level === 'National'))
  regional = computed(() => this.ls.leagues().filter(l => l.type === 'League' && l.level === 'Regional'))
  club = computed(() => this.ls.leagues().filter(l => l.type === 'League' && l.level === 'Club'))

  selectLeague( league: League ) {
     this.selected.emit( league );
  }
}
