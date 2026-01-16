import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Fixture, LatLong } from 'app/fixtures/@store/fixture';
import { GoogleURLPipe, BingURLPipe, OSMapURLPipe } from '../fixture-pipes';
import { ExternalLinkIconComponent } from '../../shared/components/external-link-icon.component';
import { MatMenuModule } from '@angular/material/menu';
import { input } from "@angular/core";

@Component({
  selector: 'app-map-menu-items',
  template: `
      <!-- Exclude maps for fixtures where the location is just obtained from the club --> 
      @if (fixture().latLong && fixture().locSource !== 'club') {

        <a  mat-menu-item href="{{fixture() | osMapURL}}" target="_blank">
          OS map
          <app-external-link-icon></app-external-link-icon>
        </a>

        <a mat-menu-item href="{{fixture() | googleURL}}" target="_blank">
          Google map
          <app-external-link-icon></app-external-link-icon>
        </a>

        <a  mat-menu-item href="{{fixture() | bingURL}}" target="_blank">
          Bing map
          <app-external-link-icon/>
        </a>
        
      }

      @if (fixture().what3words) {
      <a mat-menu-item [href]="'https://what3words.com/' + fixture().what3words" target="_blank">
        What 3 Words
        <app-external-link-icon/>
      </a>
      }
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatMenuModule, ExternalLinkIconComponent, GoogleURLPipe, BingURLPipe, OSMapURLPipe]
})
export class MapMenuItemsComponent {

  fixture = input.required<Fixture>();
  homeLocation = input.required<LatLong>();
  handset = input.required<boolean>();

}
