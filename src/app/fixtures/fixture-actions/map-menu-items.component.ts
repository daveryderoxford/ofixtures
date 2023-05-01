import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Fixture } from 'app/model';
import { LatLong } from 'app/model/fixture';

@Component( {
  selector: 'app-map-menu-items',
  template: `
      <ng-container *ngIf="fixture.latLong && fixture.locSource !== 'club'">

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
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class MapMenuItemsComponent implements OnInit {

  @Input() fixture: Fixture;
  @Input() homeLocation: LatLong
  @Input() handset: boolean;

  constructor () { }

  ngOnInit(): void {
  }

}
