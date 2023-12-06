import { Component } from '@angular/core';
import { MatLegacyCardModule } from '@angular/material/legacy-card';
import { LeagueAdminCardComponent } from '../league-admin/league-admin-card/league-admin-card.component';
import { FixtureAdminCardComponent } from '../additional-fixture/fixture-admin-card/fixture-admin-card.component';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { ToolbarComponent } from '../../shared/components/toolbar.component';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    standalone: true,
    imports: [ToolbarComponent, FlexModule, FixtureAdminCardComponent, LeagueAdminCardComponent, MatLegacyCardModule]
})
export class AdminComponent {

  constructor() {}

}
