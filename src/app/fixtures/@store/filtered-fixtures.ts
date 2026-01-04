import { computed, effect, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { FixtureFilter, GradeFilter } from 'app/fixtures/@store/fixture-filter';
import { UserData } from 'app/user/@store/user';
import { differenceInMonths, isSaturday, isSunday, isWeekend } from 'date-fns';
import { Fixture } from './fixture';
import { FixturesService } from './fixtures.service';
import { UserDataService } from 'app/user/@store/user-data.service';
import { LocalStorageService } from './local-storage';

@Injectable({
   providedIn: 'root'
})
export class FilteredFixtures {
   protected auth = inject(AuthService);
   protected fs = inject(FixturesService);
   protected usd = inject(UserDataService);
   private ls = inject(LocalStorageService);

   private static DEFAULT_FILTER = {
      time: { sat: true, sun: true, weekday: true },
      gradesEnabled: true,
      grades: makeDefaultGrades(),
      likedOnly: false
   };

   // Clear liked filter on logout.
   _filter = linkedSignal<boolean, FixtureFilter>({
      source: () => this.auth.loggedIn(),
      computation: (loggedIn, previous) => {
         if (!previous) return FilteredFixtures.DEFAULT_FILTER;
         return loggedIn ? previous.value : ({ ...previous.value, likedOnly: false });
      }
   });

   readonly filter = this._filter.asReadonly();

   private _search = signal<string>('');
   readonly search = this._search.asReadonly();

   constructor() {

      const grades = this.ls.getFromLocalStorage('grades') as GradeFilter[] | null;
      if (grades) {
         this._filter.set({ ...FilteredFixtures.DEFAULT_FILTER, grades: grades });
      }

      effect(() => this.ls.saveToLocalStorage('grades', this.filter().grades));

   }

   fixtures = computed(() => {
      const s = this.search();
      const searchStr = s.length < 2 ? '' : s;
      return this.fs.fixtures().filter(fix => isFixtureShown(fix, this.usd.userdata(), this.filter(), searchStr));
   });


   setFilter(f: FixtureFilter) {
      this._filter.set({ ...f });
   }

   setSearch(str: string) {
      this._search.set(str);
   }
}

export function isFixtureShown(fix: Fixture, userdata: UserData | null | undefined, ftr: FixtureFilter, search: string): boolean {

   const fixdate = new Date(fix.date);

   const timeFilterPassed = (isSaturday(fixdate) && ftr.time.sat === true) ||
      (isSunday(fixdate) && ftr.time.sun === true) ||
      (!isWeekend(fixdate) && ftr.time.weekday === true);

   let gradeOFilterPassed: boolean;
   if (ftr.gradesEnabled) {
      const gradeFilter = ftr.grades.find((grade) => grade.name === fix.grade)!;

      gradeOFilterPassed = gradeFilter.enabled &&
         differenceInMonths(fixdate, new Date()) <= gradeFilter.time &&
         (fix.distance !== undefined && fix.distance < gradeFilter.distance);
   } else {
      gradeOFilterPassed = true;
   }

   let isLiked = false;
   const likedOnly = ftr.likedOnly;
   isLiked = userdata ? userdata.reminders.includes(fix.id) : true;

   const s = search.toLocaleLowerCase();

   const searchPassed = !s || s === '' ||
      anyWordStartsWith(fix.club, s) ||
      anyWordStartsWith(fix.area, s) ||
      anyWordStartsWith(fix.nearestTown, s) ||
      anyWordStartsWith(fix.name, s);
   // For liked only show all liked events.  Otherwise filter based on time and grade fiilters
   return likedOnly ? isLiked : timeFilterPassed && gradeOFilterPassed && searchPassed;

}

export function makeDefaultGrades(): GradeFilter[] {
   return [
      { name: 'IOF', enabled: true, distance: 1000, time: 48 },
      { name: 'International', enabled: true, distance: 1000, time: 48 },
      { name: 'National', enabled: true, distance: 500, time: 12 },
      { name: 'Regional', enabled: true, distance: 100, time: 12 },
      { name: 'Club', enabled: true, distance: 60, time: 6 },
      { name: 'Local', enabled: true, distance: 40, time: 2 },
   ];
}

export function anyWordStartsWith(str: string, search: string): boolean {
   if (!str) return false;
   const words = str.toLocaleLowerCase().split(' ');
   return words.some(word => word.startsWith(search.toLocaleLowerCase()));
}
