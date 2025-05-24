import { Injectable } from '@angular/core';
import { LatLong } from 'app/fixtures/@store/fixture';
import { GradeFilter } from 'app/fixtures/@store/fixture-filter';

export type LocalStorageKey = 'grades' | 'location';

export interface LocalStorageLocationData {
   postcode: string;
   latlng: LatLong;
}

export type LocalStorageData = LocalStorageLocationData | GradeFilter[];

@Injectable({
   providedIn: 'root'
})
export class LocalStorageService {

   saveToLocalStorage(key: LocalStorageKey, data: LocalStorageData): void {
      if (data) {
         try {
            localStorage.setItem(key, JSON.stringify(data));
         } catch (e: any) {
            console.error(`LocalStorageService: Error saving to local storage. Key: ${key}`, e.message);
         }
      }
   }

   getFromLocalStorage(key: LocalStorageKey): LocalStorageData | null {
      try {
         const str = localStorage.getItem(key);
         return str ? JSON.parse(str) as LocalStorageData : null;
      } catch (e: any) {
         console.error(`LocalStorageService: Error reading from local storage. Key: ${key}`, e.message);
         return null;
      }
   }
}