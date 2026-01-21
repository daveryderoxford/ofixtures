import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ExtendedModule } from '@ngbracket/ngx-layout/extended';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { FixtureActionsComponent } from '../fixture-actions/fixture-actions.component';
import { FixtureDatePipe, FixtureDistanceColorPipe, GradeIconNamePipe } from './fixtures-grid-pipes';
import { LikedIcon } from './liked-icon';
import { EllipsisPipe } from '../../shared/pipes/ellipsis-pipe';
import { FixturesGridBaseComponent } from './fixtures-grid.base';

@Component({
   selector: 'app-fixtures-list',
   templateUrl: './fixtures-list.html',
   styleUrls: ['./fixtures-list.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      ScrollingModule, FlexModule, ExtendedModule, MatIconModule, MatListModule,
      MatDividerModule, EllipsisPipe, FixtureDatePipe, FixtureDistanceColorPipe,
      GradeIconNamePipe, LikedIcon, FixtureActionsComponent
   ]
})
export class FixturesList extends FixturesGridBaseComponent {
   itemsize = 88;
}
