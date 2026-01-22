import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ExtendedModule } from '@ngbracket/ngx-layout/extended';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { ExternalLinkIcon } from '../../shared/components/external-link-icon';
import { EnterButton } from '../enter-button/enter-button';
import { FixtureActionsMenu } from '../fixture-actions-menu/fixture-actions-menu';
import { MapMenuItems } from '../fixture-actions-menu/map-menu-items';
import { FixtureDatePipe, FixtureDistanceColorPipe, FixtureDistancePipe, GradeIconNamePipe, LocationPipe } from './fixtures-grid-pipes';
import { LikedIcon } from './liked-icon';
import { FixturesGridBaseComponent } from './fixtures-grid.base';

@Component({
   selector: 'app-fixtures-table',
   templateUrl: './fixtures-table.html',
   styleUrls: ['./fixtures-table.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [ScrollingModule, FlexModule, ExtendedModule, MatButtonModule, MatTooltipModule, MatIconModule, ExternalLinkIcon, MatMenuModule, MapMenuItems, FixtureActionsMenu, LocationPipe, 
      FixtureDatePipe, FixtureDistancePipe, FixtureDistanceColorPipe, GradeIconNamePipe, EnterButton, LikedIcon]
})
export class FixturesTable extends FixturesGridBaseComponent {
   itemsize = 38;
}
