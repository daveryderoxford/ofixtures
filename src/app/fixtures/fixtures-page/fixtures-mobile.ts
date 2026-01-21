import { ChangeDetectionStrategy, Component, effect, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LeagueHeaderComponent } from '../../league/league-header/league-header.component';
import { ToolbarComponent } from '../../shared/components/toolbar.component';
import { LoadingCenteredComponent } from '../../shared/components/loading-centered.component';
import { FixturesMapComponent } from '../fixtures-map/fixtures-map.component';
import { FixturesOptionsComponent } from '../fixtures-options/fixtures-options.component';
import { PostcodeComponent } from '../postcode/postcode.component';
import { FixturesBaseComponent } from './fixtures.base';
import { FixturesList } from "../fixtures-grid/fixtures-list";

type MobileView = 'map' | 'list';

@Component({
  selector: 'app-fixtures-mobile',
  templateUrl: './fixtures-mobile.html',
  styleUrls: ['./fixtures-mobile.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PostcodeComponent, FixturesOptionsComponent, FixturesMapComponent, LeagueHeaderComponent, ToolbarComponent, MatButtonModule, MatIconModule, MatDividerModule,
    MatTooltipModule, LoadingCenteredComponent,
    FixturesList
]
})
export class FixturesMobile extends FixturesBaseComponent {

  mobileView = signal<MobileView>('list');
  showMobleFilter = signal(false);

  list = viewChild(FixturesList);

  scrollEffect = effect( () => {
    const view = this.mobileView();
    const fix = this.selectedFixture();
    const list = this.list();
    if (fix && list) {
      list.scrollToFixture(fix);
    }
  });

  toggleMobileFilter() {
    this.showMobleFilter.update(v => !v);
  }
}