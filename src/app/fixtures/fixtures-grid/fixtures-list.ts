import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ExtendedModule } from '@ngbracket/ngx-layout/extended';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { EllipsisPipe } from '../../shared/pipes/ellipsis-pipe';
import { Fixture } from '../@store/fixture';
import { FixtureActionsMenu } from '../fixture-actions-menu/fixture-actions-menu';
import { FixtureDatePipe, FixtureDistanceColorPipe, GradeIconNamePipe } from './fixtures-grid-pipes';
import { FixturesGridBaseComponent } from './fixtures-grid.base';
import { LikedIcon } from './liked-icon';

@Component({
  selector: 'app-fixtures-list',
  templateUrl: './fixtures-list.html',
  styleUrls: ['./fixtures-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ScrollingModule, FlexModule, ExtendedModule, MatIconModule, MatListModule,
    MatDividerModule, EllipsisPipe, FixtureDatePipe, FixtureDistanceColorPipe,
    GradeIconNamePipe, LikedIcon, FixtureActionsMenu
  ]
})
export class FixturesList extends FixturesGridBaseComponent {
  itemsize = 88;

  actions = viewChild.required(FixtureActionsMenu);

  openMenu() {
    this.actions().openMenu();
  }
}
