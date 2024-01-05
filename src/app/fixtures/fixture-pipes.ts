import { Pipe, PipeTransform } from "@angular/core";
import { Fixture, LatLong } from "app/model/fixture";

import { EventGrade } from 'app/model';
import { differenceInCalendarDays, format } from 'date-fns';

/**
 * Pipes to display fixture fields used for both
 */
const MAX_LOCATION_LENGTH = 50;

/** Returns HTML string for the complete location genertaed from 
 *  area, nearest twon and postcode.  Should be used in template as 
 * [innerHTML]="fixture | location"
 * The town is omitted if:
 *   - it is the same as the area
 *   - if the string will be longer than MAX_LOCATION_LENGTH.
 *  
 * */
@Pipe({
    name: 'location',
    pure: true,
    standalone: true
})
export class LocationPipe implements PipeTransform {
   transform( fix: Fixture ): string {
      const area = fix.area;
      // if town and area are the same ommit the town
      const town = ( fix.nearestTown === area ) ? null : fix.nearestTown;
      const post = fix.postcode;

      let str = area;
      str = ( town ) ? str + ",&nbsp;&nbsp;&nbsp;" + town : str;
      str = ( post ) ? str + ",&nbsp;&nbsp;&nbsp;<b>" + post + "</b>": str;

      if ( (area+town+post).length > MAX_LOCATION_LENGTH ) {
         str = ( post ) ? area + ",&nbsp;&nbsp;&nbsp;<b>" + post + "</b>" : str;
      }

      return str;
   }
}

/** Google maps link with directions from home location */
@Pipe({
    name: 'googleDirectionsURL',
    pure: true,
    standalone: true
})
export class GoogleDirectionsURLPipe implements PipeTransform {
   transform( fixture: Fixture, homeLocation: LatLong ): string {

      if ( !homeLocation || homeLocation === undefined || !fixture ) {
         return "";
      }

      return "https://www.google.com/maps/dir/?api=1&origin=" + latLongStr( homeLocation )
         + "&destination= " + latLongStr( fixture.latLong );
   }
}

@Pipe({
    name: 'googleURL',
    pure: true,
    standalone: true
})
export class GoogleURLPipe implements PipeTransform {
   transform( fix: Fixture ): string {
      return "https://www.google.com/maps/search/?api=1&query=" +
         latLongStr( fix.latLong ) + "&query_place_id=" + fix.area + "&zoom=11";
   }
}

@Pipe({
    name: 'bingURL',
    pure: true,
    standalone: true
})
export class BingURLPipe implements PipeTransform {
   transform( fix: Fixture ): string {
      return 'https://www.bing.com/maps/?cp=' + latLongStr( fix.latLong, '~' ) + "&lvl=15&style=s&sp=" +
         latLongStr( fix.latLong, '_' ) + "_" + fix.area;
   }
}

/* 
Returns a streetmap URL to display OS map for StreetMap website.
UR is of the form https://streetmap.co.uk/loc/N52.038333,W4.578611
*/
@Pipe({
    name: 'streetmapURL',
    standalone: true
})
export class StreetmapURLPipe implements PipeTransform {
   transform( fix: Fixture ): string {
      const l = fix.latLong;
      if ( l.lng < 0 ) {
         return `https://streetmap.co.uk/loc/N${l.lat.toString()},W${( -l.lng ).toString()}`;
      } else {
         return `https://streetmap.co.uk/loc/N${l.lat.toString()},E${( l.lng ).toString()}`;
      }
   }
}

/** Reformat ISO date into displayed date string */
@Pipe({
    name: 'fixturedate',
    pure: true,
    standalone: true
})
export class FixtureDatePipe implements PipeTransform {
   transform( date: string ): string {

      // For the next week display days in the future
      const d = new Date( date );

      const daysFrom = differenceInCalendarDays( d, new Date() );

      if ( daysFrom >= 7 ) {
         return format( d, "iii d MMM yy" );
      } else if ( daysFrom <= 7 && daysFrom > 1 ) {
         return format( d, "iii do" );
      } else if ( daysFrom === 1 ) {
         return "TOMORROW ";
      } else if ( daysFrom === 0 ) {
         return "TODAY ";
      }
   }
}

@Pipe({
    name: 'distance',
    standalone: true
})
export class FixtureDistancePipe implements PipeTransform {
   transform( distance: number ): string {
      if ( distance === -1 ) {
         return "";
      } else {
         return distance.toString();
      }
   }
}

@Pipe({
    name: 'distancecolor',
    pure: true,
    standalone: true
})
export class FixtureDistanceColorPipe implements PipeTransform {
   transform( distance: number ): string {

      if ( distance === -1 ) {
         return "#000000";
      } else if ( distance < 20 ) {
         return "#FF0000";
      } else if ( distance < 40 ) {
         return "#0000FF";
      } else {
         return "#000000";
      }
   }
}


@Pipe({
    name: 'liked',
    standalone: true
})
export class LikedPipe implements PipeTransform {
   transform( eventId: string, likedEvents: string[] ): boolean {
      if ( !likedEvents ) { return false; }
      return likedEvents.includes( eventId );
   }
}

@Pipe({
    name: 'gradeIconName',
    standalone: true
})
export class GradeIconNamePipe implements PipeTransform {
   transform( grade: EventGrade ): string {
      return 'grade-' + grade.toLowerCase();
   }
}


function latLongStr( loc: LatLong, seperator = "," ): string {
   return loc.lat.toString() + seperator + loc.lng.toString();
}


