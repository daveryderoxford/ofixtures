import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ExtendedModule } from '@ngbracket/ngx-layout/extended';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { ExternalLinkIconComponent } from '../../shared/components/external-link-icon.component';
import { EnterButtonComponent } from '../enter-button/enter-button.component';
import { FixtureActionsComponent } from '../fixture-actions/fixture-actions.component';
import { MapMenuItemsComponent } from '../fixture-actions/map-menu-items.component';
import { FixtureDatePipe, FixtureDistanceColorPipe, FixtureDistancePipe, GradeIconNamePipe, LocationPipe } from './fixtures-grid-pipes';
import { LikedIcon } from './liked-icon';
import { FixturesGridBaseComponent } from './fixtures-grid.base';

@Component({
   selector: 'app-fixtures-table',
   templateUrl: './fixtures-table.html',
   styleUrls: ['./fixtures-table.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [ScrollingModule, FlexModule, NgClass, ExtendedModule, MatButtonModule, MatTooltipModule, MatIconModule, ExternalLinkIconComponent, MatMenuModule, MapMenuItemsComponent, FixtureActionsComponent, LocationPipe, 
      FixtureDatePipe, FixtureDistancePipe, FixtureDistanceColorPipe, GradeIconNamePipe, EnterButtonComponent, LikedIcon]
})
export class FixturesTable extends FixturesGridBaseComponent {
   itemsize = 38;
}
