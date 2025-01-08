import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Fixture } from 'app/model';
import { LatLong } from 'app/model/fixture';
import { GoogleURLPipe, GoogleDirectionsURLPipe, BingURLPipe, StreetmapURLPipe } from '../fixture-pipes';
import { ExternalLinkIconComponent } from '../../shared/components/external-link-icon.component';
import { MatMenuModule } from '@angular/material/menu';
import { input } from "@angular/core";

@Component({
    selector: 'app-map-menu-items',
    template: `
      <!-- Exclude maps for fixtures where the location is just obtained from the club --> 
      @if (fixture().latLong && fixture().locSource !== 'club') {

      <!-- For OS maps, use streetmap for moble and bing for desktop -->
      @if (handset()) {
        <a  mat-menu-item href="{{fixture() | streetmapURL}}" target="_blank">
          OS map
          <app-external-link-icon></app-external-link-icon>
        </a>
      }  @else {

        <a  mat-menu-item href="{{fixture() | bingURL}}" target="_blank">
          OS map
          <app-external-link-icon/>
        </a>
        }

        <a mat-menu-item href="{{fixture() | googleURL}}" target="_blank">
          Google map
          <app-external-link-icon></app-external-link-icon>
        </a>
        
        <a mat-menu-item href="{{fixture() | googleDirectionsURL:homeLocation()}}" target="_blank">
          Directions
          <app-external-link-icon></app-external-link-icon>
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
    imports: [MatMenuModule, ExternalLinkIconComponent, GoogleURLPipe, GoogleDirectionsURLPipe, BingURLPipe, StreetmapURLPipe]
})
export class MapMenuItemsComponent {

  fixture = input.required<Fixture>();
  homeLocation = input.required<LatLong>();
  handset = input.required<boolean>();

}
