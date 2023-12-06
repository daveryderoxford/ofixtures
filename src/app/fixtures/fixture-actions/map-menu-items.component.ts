import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Fixture } from 'app/model';
import { LatLong } from 'app/model/fixture';
import { GoogleURLPipe, GoogleDirectionsURLPipe, BingURLPipe, StreetmapURLPipe } from '../fixture-pipes';
import { ExternalLinkIconComponent } from '../../shared/components/external-link-icon.component';
import { MatLegacyMenuModule } from '@angular/material/legacy-menu';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-map-menu-items',
    template: `
      <!-- Exclude maps for fixtures where the location is just obtained from the club --> 
      <ng-container *ngIf="fixture.latLong && fixture.locSource !== 'club'">

      <!-- For OS maps, use streetmap for moble and bing for desktop -->
        <a *ngIf="handset" mat-menu-item href="{{fixture | streetmapURL}}" target="_blank">
          OS map
          <app-external-link-icon></app-external-link-icon>
        </a>

        <a *ngIf="!handset" mat-menu-item href="{{fixture | bingURL}}" target="_blank">
          OS map
          <app-external-link-icon></app-external-link-icon>
        </a>

        <a mat-menu-item href="{{fixture | googleURL}}" target="_blank">
          Google map
          <app-external-link-icon></app-external-link-icon>
        </a>
        
        <a mat-menu-item href="{{fixture | googleDirectionsURL:homeLocation}}" target="_blank">
          Directions
          <app-external-link-icon></app-external-link-icon>
        </a>
      <ng-container>

      <a *ngIf="fixture.what3words" mat-menu-item [href]="'https://what3words.com/' + fixture.what3words" target="_blank">
        What 3 Words
        <app-external-link-icon></app-external-link-icon>
      </a>
  `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, MatLegacyMenuModule, ExternalLinkIconComponent, GoogleURLPipe, GoogleDirectionsURLPipe, BingURLPipe, StreetmapURLPipe]
})
export class MapMenuItemsComponent implements OnInit {

  @Input() fixture: Fixture;
  @Input() homeLocation: LatLong
  @Input() handset: boolean;

  constructor () { }

  ngOnInit(): void {
  }

}
