import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router, RouterLink } from '@angular/router';
import { LeagueService } from 'app/league/league-service';
import { League } from 'app/model/league';
import { DialogsService } from 'app/shared';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyListModule } from '@angular/material/legacy-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgIf, NgFor, AsyncPipe, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { MatLegacyCardModule } from '@angular/material/legacy-card';

@Component({
    selector: 'app-league-admin-card',
    templateUrl: './league-admin-card.component.html',
    styleUrls: ['./league-admin-card.component.scss'],
    standalone: true,
    imports: [MatLegacyCardModule, FlexModule, MatLegacyButtonModule, RouterLink, MatIconModule, NgIf, MatExpansionModule, MatLegacyListModule, MatDividerModule, NgFor, MatLineModule, AsyncPipe, DatePipe]
})
export class LeagueAdminCardComponent {

  leagues$: Observable<League[]>;

  constructor ( private ls: LeagueService, 
                private auth: Auth,
                private router: Router,
                private ds: DialogsService ) { 
   
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
