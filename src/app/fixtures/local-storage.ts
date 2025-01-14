import { LatLong } from 'app/model/fixture';
import { GradeFilter } from 'app/model/fixture-filter';

type LocalStorageKey = 'grades' | 'location';

export interface LocalStorageLocationData {
   postcode: string;
   latlng: LatLong;
}

export function saveToLocalStorage(key: LocalStorageKey, data: LocalStorageLocationData | GradeFilter[]) {
   if (data) {
      try {
         localStorage.setItem(key, JSON.stringify(data));
      } catch (e: any) {
         console.log(`FixtureService: Error saving to local storage Key: ${key}   ${e.message}`);
      }
   }
}

export function getFromLocalStorage(key: LocalStorageKey): LocalStorageLocationData | GradeFilter[] | null {
   try {
      const str = localStorage.getItem(key);
      if (!str) {
         return null;
      } else {
         return JSON.parse(str);
      }
   } catch (e: any) {
      console.log(`FixtureService: Error reading from local storage.  Key: ${key}` + '   ' + e.message);
      return null;
   }
}
