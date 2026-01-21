import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularSplitModule } from 'angular-split';
import { LeagueHeaderComponent } from '../../league/league-header/league-header.component';
import { SidenavButtonComponent } from '../../shared/components/sidenav-button.component';
import { LoadingCenteredComponent } from '../../shared/components/loading-centered.component';
import { FixturesTable } from '../fixtures-grid/fixtures-table';
import { FixturesMapComponent } from '../fixtures-map/fixtures-map.component';
import { FixturesOptionsComponent } from '../fixtures-options/fixtures-options.component';
import { PostcodeComponent } from '../postcode/postcode.component';
import { ControlPanelComponent } from './control-panel.component';
import { FixturesBaseComponent } from './fixtures.base';
import { FixtureSearchComponent } from '../fixtures-search/fixture-search.component';
import { Fixture } from '../@store/fixture';
import { ToolbarComponent } from "app/shared/components/toolbar.component";

@Component({
  selector: 'app-fixtures-desktop',
  templateUrl: './fixtures-desktop.html',
  styleUrls: ['./fixtures-desktop.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FixtureSearchComponent, SidenavButtonComponent, PostcodeComponent, FixturesOptionsComponent,
    AngularSplitModule, FixturesMapComponent, LeagueHeaderComponent, FixturesTable,
    MatButtonModule, MatIconModule, MatDividerModule, ControlPanelComponent,
    MatTooltipModule, LoadingCenteredComponent,
    ToolbarComponent
]
})
export class FixturesDesktop extends FixturesBaseComponent {
  
  grid = viewChild.required(FixturesTable);

  mapFixtureSelected(fixture: Fixture) {
    this.selection.setSelectedFixture(fixture);
    this.grid().scrollToFixture(fixture);
  }
}