/**  */
import { describe, it, expect } from 'vitest';

import { RaceSignup } from '../fixtures/entries/racesignup.js';
import { realRacesignupFile } from './racesignup_data.js';
import { EntryData } from '../fixtures/entries/entry.js';
import { RaceSignupV2 } from '../fixtures/entries/racesignup-v2.js';
import { realRacesignupFileV2 } from './racesignup_data-v2.js';

const firstv2Expected = {
   entruUrl: 'https://racesignup.co.uk/aire-otley',
   date: '2026-01-07T00:00:00.000Z',
   enddate: null,
   club: 'AIRE',
   title: 'AIRE Otley',
   status: 'Open',
   source: 'Racesignup'
};

const secondv2Expected = {
   entruUrl: 'https://racesignup.co.uk/essex-winter-midweek-series-2025-26-no-6-pitsea',
   date: '2026-01-07T00:00:00.000Z',
   enddate: null,
   club: 'HAVOC',
   title: 'Essex Winter Midweek Series 2025/26 No.6 - Pitsea',
   status: 'Open',
   source: 'Racesignup'
};

const OneHundrethv2Expected = {
   entruUrl: 'https://racesignup.co.uk/exbury-10k',
   date: '2026-06-27T23:00:00.000Z',
   enddate: null,
   club: undefined,
   title: 'Exbury Gardens 10K 2026',
   status: 'Open',
   source: 'Racesignup'
};

describe('RaceSignup data parser ', () => {

   it('Should parse race sigup data', () => {

      const rs = new RaceSignup();
      const events: EntryData[] = rs.parse(realRacesignupFile);

      console.log(events);

      expect(events.length).toBe(69);

   });

   it.only('Should parse race sigup data in v2 format', () => {

      const rs = new RaceSignupV2();
      const events: EntryData[] = rs.parse(realRacesignupFileV2);

      console.log(events);

      expect(events.length).toEqual(103);
      expect(events[0]).toEqual(firstv2Expected);
      expect(events[1]).toEqual(secondv2Expected);
      expect(events[99]).toEqual(OneHundrethv2Expected);
   });

   it('Should load events from racesignup site', async () => {

      const rs = new RaceSignup();
      const events: EntryData[] = await rs.getEvents();

      //   console.log(events);

      expect(events.length).toBeGreaterThan(0);

   }, 40000);

});