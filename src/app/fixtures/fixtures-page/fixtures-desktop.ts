import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularSplitModule } from 'angular-split';
import { LeagueHeader } from '../../league/league-header/league-header';
import { SidenavButton } from '../../shared/components/sidenav-button';
import { LoadingCentered } from '../../shared/components/loading-centered';
import { FixturesTable } from '../fixtures-grid/fixtures-table';
import { FixturesMap } from '../fixtures-map/fixtures-map';
import { FixturesOptions } from '../fixtures-options/fixtures-options';
import { PostcodeInput } from '../postcode/postcode-input/postcode-input';
import { ControlPanelComponent } from './control-panel.component';
import { FixturesBaseComponent } from './fixtures.base';
import { FixtureSearch } from '../fixtures-search/fixture-search';
import { Fixture } from '../@store/fixture';
import { AppToolbar } from "app/shared/components/app-toolbar";

@Component({
  selector: 'app-fixtures-desktop',
  templateUrl: './fixtures-desktop.html',
  styleUrls: ['./fixtures-desktop.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FixtureSearch, SidenavButton, PostcodeInput, FixturesOptions,
    AngularSplitModule, FixturesMap, LeagueHeader, FixturesTable,
    MatButtonModule, MatIconModule, MatDividerModule, ControlPanelComponent,
    MatTooltipModule, LoadingCentered,
    AppToolbar
]
})
export class FixturesDesktop extends FixturesBaseComponent {
  
  grid = viewChild.required(FixturesTable);

  mapFixtureSelected(fixture: Fixture) {
    this.selection.setSelectedFixture(fixture);
    this.grid().scrollToFixture(fixture);
  }
}