import { Component, OnInit, Input, output } from '@angular/core';
import { FixtureTimeFilter } from 'app/model/fixture-filter';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { input } from "@angular/core";

@Component({
    selector: 'app-fixture-week-filter',
    
        template: `
 <div>
    <mat-button-toggle-group multiple="true">

      <mat-button-toggle disableRipple class="toggelebutton" [checked]="timeFilter().sat"
        (click)="timeFilterClicked('sat')">
        Sat
      </mat-button-toggle>
      <mat-button-toggle disableRipple class="toggelebutton" [checked]="timeFilter().sun"
        (click)="timeFilterClicked('sun')">
        Sun
      </mat-button-toggle>
      <mat-button-toggle disableRipple class="toggelebutton" [checked]="timeFilter().weekday"
        (click)="timeFilterClicked('weekday')">
        Weekday
      </mat-button-toggle>

    </mat-button-toggle-group>
  </div>
  `,
    styles: [
        `
        /* TODO(mdc-migration): The following rule targets internal classes of button that may no longer apply for the MDC version. */
        mat-button-toggle {
                 height: 38px;
                 line-height: 38px;
                 padding: 0 8px;
              }`,
        `
        /* TODO(mdc-migration): The following rule targets internal classes of button that may no longer apply for the MDC version. */
        ::ng-deep .mat-button-toggle-appearance-standard .mat-button-toggle-label-content {
                 line-height: 35px !important;
                 padding: 0 8px !important;
              }`
    ],
    standalone: true,
    imports: [MatButtonToggleModule]
})
export class FixtureWeekFilterComponent {

   timeFilter = input<FixtureTimeFilter>();
   filterChanged = output<FixtureTimeFilter>();

   constructor () { }

   timeFilterClicked( key: string ) {
      this.timeFilter()[ key ] = !this.timeFilter()[ key ];
      this.filterChanged.emit( this.timeFilter());
   }
}
