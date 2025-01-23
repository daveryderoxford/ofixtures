import { Injectable, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FixturesService } from 'app/fixtures/fixtures.service';
import { Club } from 'app/model/club';

@Injectable({
   providedIn: 'root'
})
export class ClubService {
   fixtureService = inject(FixturesService);

   private allFixtures = toSignal(this.fixtureService.allFixtues(), { initialValue: [] });

   selected = signal<string | null>(null);

   clubs = computed(() => {
      const allClubs = this.allFixtures().map(fix => {
         return {
            name: fix.club,
            url: fix.clubURL
         };
      });
      return uniqueObjects(allClubs).sort((a, b) => a.name.localeCompare(b.name));
   });

   fixtures = computed(() => this.allFixtures().filter(fix => fix.name === this.selected()));

   find(name: string | undefined): Club | undefined {
      if (!name) return undefined;
      return this.clubs().find(c => c.name === name);
   }
}

/** Returns unique objects in an array a based on object properties (rather than references) */
function uniqueObjects<T>(a: T[]): T[] {
   const set = new Set<string>(a.map(obj => JSON.stringify(obj)));
   return Array.from(set).map(s => JSON.parse(s)) as T[];
}