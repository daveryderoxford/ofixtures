import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { Fixture, LatLong } from 'app/fixtures/@store/fixture';
import { ExternalLinkIconComponent } from '../../shared/components/external-link-icon.component';
import { MatMenuModule } from '@angular/material/menu';
import { input } from "@angular/core";
import { getSysmapsURL, getBingURL, getGoogleMapsURL } from './mapWebsiteURL';

@Component({
  selector: 'app-map-menu-items',
  template: `
    <!-- Exclude maps for fixtures where the location is just obtained from the club --> 
    @if (fixture().latLong && fixture().locSource !== 'club') {

      <a  mat-menu-item [href]="sysmapsURL()" target="_blank">
        OS map
        <app-external-link-icon></app-external-link-icon>
      </a>

      <a mat-menu-item [href]="googleURL()" target="_blank">
        Google map
        <app-external-link-icon></app-external-link-icon>
      </a>

      <a  mat-menu-item [href]="bingURL()" target="_blank">
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
  imports: [MatMenuModule, ExternalLinkIconComponent]
})
export class MapMenuItemsComponent {

  fixture = input.required<Fixture>();
  homeLocation = input.required<LatLong>();
  handset = input.required<boolean>();

  sysmapsURL = computed(() => getSysmapsURL(this.fixture()));
  googleURL = computed(() => getGoogleMapsURL(this.fixture()));
  bingURL = computed(() => getBingURL(this.fixture()));
}
