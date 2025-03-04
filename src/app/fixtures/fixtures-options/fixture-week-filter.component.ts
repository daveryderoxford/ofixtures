import { Component, OnInit, Input, output } from '@angular/core';
import { FixtureTimeFilter, FixtureTimeFilterKey } from 'app/model/fixture-filter';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { input } from "@angular/core";

@Component({
    selector: 'app-fixture-week-filter',
    template: `
 <div>
    <mat-button-toggle-group hideMultipleSelectionIndicator multiple="true">

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
    imports: [MatButtonToggleModule]
})
export class FixtureWeekFilterComponent {

   timeFilter = input.required<FixtureTimeFilter>();
   filterChanged = output<FixtureTimeFilter>();

   constructor () { }

  timeFilterClicked(key: FixtureTimeFilterKey ) {
      this.timeFilter()[ key ] = !this.timeFilter()[ key ];
      this.filterChanged.emit( this.timeFilter());
   }
}
