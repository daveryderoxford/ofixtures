import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LeagueAdminCard } from '../league-admin/league-admin-card/league-admin-card';
import { FixtureAdminCard } from '../additional-fixture/fixture-admin-card/fixture-admin-card';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { AppToolbar } from '../../shared/components/app-toolbar';

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.html',
    styleUrls: ['./admin-page.scss'],
    imports: [AppToolbar, FlexModule, FixtureAdminCard, LeagueAdminCard, MatCardModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPage {
}
