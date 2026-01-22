import { ChangeDetectionStrategy, Component, effect, signal, untracked, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LeagueHeader } from '../../league/league-header/league-header';
import { AppToolbar } from '../../shared/components/app-toolbar';
import { LoadingCentered } from '../../shared/components/loading-centered';
import { FixturesMap } from '../fixtures-map/fixtures-map';
import { FixturesOptions } from '../fixtures-options/fixtures-options';
import { PostcodeInput } from '../postcode/postcode-input/postcode-input';
import { FixturesBaseComponent } from './fixtures.base';
import { FixturesList } from "../fixtures-grid/fixtures-list";

type MobileView = 'map' | 'list';

@Component({
  selector: 'app-fixtures-mobile',
  templateUrl: './fixtures-mobile.html',
  styleUrls: ['./fixtures-mobile.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PostcodeInput, FixturesOptions, FixturesMap, LeagueHeader, AppToolbar, MatButtonModule, MatIconModule, MatDividerModule,
    MatTooltipModule, LoadingCentered,
    FixturesList
]
})
export class FixturesMobile extends FixturesBaseComponent {

  mobileView = signal<MobileView>('list');
  showMobleFilter = signal(false);

  list = viewChild('fixturesList', { read: FixturesList });

  scrollEffect = effect( () => {
    const view = this.mobileView();
    const fix = untracked(() => this.selectedFixture());
    const list = this.list();
    if (fix && list && view === 'list') {
      list.scrollToFixture(fix);
    }
  });

  toggleMobileFilter() {
    this.showMobleFilter.update(v => !v);
  }
}