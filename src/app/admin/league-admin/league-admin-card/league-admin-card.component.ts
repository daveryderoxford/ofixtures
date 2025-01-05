import { Component, OnInit, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router, RouterLink } from '@angular/router';
import { LeagueService } from 'app/league/league-service';
import { League } from 'app/model/league';
import { DialogsService } from 'app/shared';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-league-admin-card',
    templateUrl: './league-admin-card.component.html',
    styleUrls: ['./league-admin-card.component.scss'],
    imports: [MatCardModule, FlexModule, MatButtonModule, RouterLink, MatIconModule, MatExpansionModule, MatListModule, MatDividerModule, MatLineModule, AsyncPipe, DatePipe]
})
export class LeagueAdminCardComponent {
  private ls = inject(LeagueService);
  private auth = inject(Auth);
  private router = inject(Router);
  private ds = inject(DialogsService);


  leagues$: Observable<League[]>;

  constructor () { 
   
    this.leagues$ = this.ls.leagues$.pipe( 
      map( arr => arr.filter( league => league.userId === this.auth.currentUser.uid )),
      tap(arr => console.log("Leagues filtered count: " + arr.length))
    );
  }

 async delete(league: League) {

   if ( await this.ds.confirm( 'Delete league', 'Delete leauge?.' )) {
      await this.ls.delete( league.id );
   }
  }

  async edit( league: League ) {
    this.router.navigate( ['/admin/league/edit', league.id])
  }

}
