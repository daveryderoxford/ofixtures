import { Component } from '@angular/core';
import { addDays, format } from 'date-fns'
import { MatLegacyMenuModule } from '@angular/material/legacy-menu';
import { input } from "@angular/core";

@Component({
    selector: 'app-add-to-calendar',
    template: '<button (click) = "addToCalendar()" mat-menu-item>Add To Google Calender</button>',
    standalone: true,
    imports: [MatLegacyMenuModule],
})
export class AddToGoogleCalendarButtonComponent  {

   date = input<Date>(null);
   title = input("");
   details = input("");
   location = input("");

   addToCalendar() {
      if ( !this.date() || this.title() === "" ) {
         throw ( new Error( "Date and Title are required" ) );
      }

      // for all day event specifty date and dates+1 day
      // format for dates is 20201231/20210101
      const startDate = new Date(this.date());
      const endDate = addDays( startDate, 1 )
      const period = format( startDate, "yyyyMMdd" ) + "/" + format( endDate, "yyyyMMdd" );

      let href = `https://www.google.com/calendar/render?action=TEMPLATE&text=${this.title()}&dates=${period}&details=${this.details()}"&location="${this.location()}&sf=true&output=xml`;
      console.log( "Added Google calander apointmant.  URL:  " + href);
      window.open( href, '_blank'); 
   }

;
;
;
;
}