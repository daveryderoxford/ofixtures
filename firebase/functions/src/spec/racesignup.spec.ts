/**  */
import { describe, it, expect } from 'vitest';

import { RaceSignup } from '../fixtures/entries/racesignup.js';
import { realRacesignupFile } from './racesignup_data.js';
import { EntryData } from '../fixtures/entries/entry.js';
import { RaceSignupV2 } from '../fixtures/entries/racesignup-v2.js';
import { realRacesignupFileV2 } from './racesignup_data-v2.js';

describe( 'RaceSignup data parser ', () => {

   it( 'Should parse race sigup data', () => {

      const rs = new RaceSignup();
      const events: EntryData[] = rs.parse( realRacesignupFile );

      console.log(events);

      expect( events.length).toBe( 69 );

   } );

   it.only('Should parse race sigup data in v2 format', () => {

      const rs = new RaceSignupV2();
      const events: EntryData[] = rs.parse(realRacesignupFileV2);

      console.log(events);

      expect(events.length).toBe(69);

   });

   it( 'Should load events from racesignup site', async ()  =>  {

      const rs = new RaceSignup();
      const events: EntryData[] = await rs.getEvents();

   //   console.log(events);

      expect(events.length).toBeGreaterThan( 0 );

   }, 40000 );

} );