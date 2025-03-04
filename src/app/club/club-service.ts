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
      const allClubs = this.allFixtures()
      .filter( (fix => fix.club && fix.club.trim() !== ''))
      .map(fix => {
         return {
            name: fix.club.trim(),
            url: fix.clubURL
         };
      });
      return uniqueNames(allClubs).sort((a, b) => a.name.localeCompare(b.name));
   });

   fixtures = computed(() => this.allFixtures().filter(fix => fix.name === this.selected()));

   find(name: string | undefined): Club | undefined {
      if (!name) return undefined;
      return this.clubs().find(c => c.name === name);
   }
}

/** Returns  clubs with unique names */
function uniqueNames(clubs: Club[]): Club[] {
   const dist = clubs.reduce<Club[]>((acc, obj) => {
      if (!acc.some(item => item.name === obj.name)) {
         acc.push(obj);
      }
      return acc;
   }, []);
   return dist;
}