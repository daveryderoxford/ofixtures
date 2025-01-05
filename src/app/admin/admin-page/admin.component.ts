import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LeagueAdminCardComponent } from '../league-admin/league-admin-card/league-admin-card.component';
import { FixtureAdminCardComponent } from '../additional-fixture/fixture-admin-card/fixture-admin-card.component';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { ToolbarComponent } from '../../shared/components/toolbar.component';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    imports: [ToolbarComponent, FlexModule, FixtureAdminCardComponent, LeagueAdminCardComponent, MatCardModule]
})
export class AdminComponent {
}
