import { Pipe, PipeTransform } from "@angular/core";
import { Fixture } from "app/fixtures/@store/fixture";
import { EventGrade } from 'app/oevent/oevent';

import { differenceInCalendarDays, format } from 'date-fns';

/**
 * Pipes to display fixture fields used for both
 */
const MAX_LOCATION_LENGTH = 40;

/** Returns HTML string for the complete location genertaed from 
 *  area, nearest twon and postcode.  Should be used in template as 
 * [innerHTML]="fixture | location"
 * The town is omitted if:
 *   - it is the same as the area
 *   - if the string will be longer than MAX_LOCATION_LENGTH.
 *  
 * */
export function getLocation(fix: Fixture): string {
   const area = fix.area;
   // if town and area are the same omit the town
   const town = (fix.nearestTown === area) ? null : fix.nearestTown;
   const post = fix.postcode;

   let str = area;

   // Only include the town if the totoal lenght is not too long
   if ((area + town + post).length < MAX_LOCATION_LENGTH) {
      str = (town) ? str + ",&nbsp;&nbsp;&nbsp;" + town : str;
   }

   str = (post) ? str + ",&nbsp;&nbsp;&nbsp;<b>" + post + "</b>" : str;

   return str;
}

@Pipe({
   name: 'location',
   pure: true,
})
export class LocationPipe implements PipeTransform {
   transform(fix: Fixture): string {
      return getLocation(fix);
   }
}

/** Reformat ISO date into displayed date string */
export function getFixtureDate(date: string): string {
   // For the next week display days in the future
   const d = new Date(date);

   const daysFrom = differenceInCalendarDays(d, new Date());

   if (daysFrom < 7 && daysFrom > 1) {
      return format(d, "iii do");
   } else if (daysFrom === 1) {
      return "TOMORROW ";
   } else if (daysFrom === 0) {
      return "TODAY ";
   } else {
      return format(d, "iii d MMM yy");
   }
}

@Pipe({
   name: 'fixturedate',
   pure: true,
})
export class FixtureDatePipe implements PipeTransform {
   transform(date: string): string {
      return getFixtureDate(date);
   }
}

export function getFixtureDistance(distance: number | undefined): string {
   if (!distance || distance === -1) {
      return "";
   } else {
      return distance.toString();
   }
}

@Pipe({
   name: 'distance',
   pure: true
})
export class FixtureDistancePipe implements PipeTransform {
   transform(distance: number | undefined): string {
      return getFixtureDistance(distance);
   }
}

export function getFixtureDistanceColor(distance: number | undefined): string {
   if (!distance) {
      return "";
   } else if (distance === -1) {
      return "#000000";
   } else if (distance < 20) {
      return "#FF0000";
   } else if (distance < 40) {
      return "#0000FF";
   } else {
      return "#000000";
   }
}

@Pipe({
   name: 'distancecolor',
   pure: true,
})
export class FixtureDistanceColorPipe implements PipeTransform {
   transform(distance: number | undefined): string {
      return getFixtureDistanceColor(distance);
   }
}

export function isLiked(eventId: string, likedEvents: string[]): boolean {
   if (!likedEvents) { return false; }
   return likedEvents.includes(eventId);
}

@Pipe({
   name: 'liked',
   pure: true
})
export class LikedPipe implements PipeTransform {
   transform(eventId: string, likedEvents: string[]): boolean {
      return isLiked(eventId, likedEvents);
   }
}

export function getGradeIconName(grade: EventGrade): string {
   return 'grade-' + grade.toLowerCase();
}

@Pipe({
   name: 'gradeIconName',
   pure: true
})
export class GradeIconNamePipe implements PipeTransform {
   transform(grade: EventGrade): string {
      return getGradeIconName(grade);
   }
}


