import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink } from '@angular/router';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { AuthService } from 'app/auth/auth.service';
import { LeagueService } from 'app/league/@store/league-service';
import { League } from 'app/league/@store/league';
import { DialogsService } from 'app/shared';

@Component({
  selector: 'app-league-admin-card',
  templateUrl: './league-admin-card.component.html',
  styleUrls: ['./league-admin-card.component.scss'],
  imports: [MatCardModule, FlexModule, MatButtonModule, RouterLink, MatIconModule, MatExpansionModule, MatListModule, MatDividerModule, MatLineModule, DatePipe]
})
export class LeagueAdminCardComponent {
  private ls = inject(LeagueService);
  private auth = inject(AuthService);
  private router = inject(Router);
  private ds = inject(DialogsService);

  leagues = computed(() => this.ls.leagues.value().filter(league => league.userId === this.auth.user()?.uid));

  async delete(league: League) {

    if (await this.ds.confirm('Delete league', 'Delete leauge?.')) {
      await this.ls.delete(league.id);
    }
  }

  async edit(league: League) {
    this.router.navigate(['/admin/league/edit', league.id]);
  }

}
