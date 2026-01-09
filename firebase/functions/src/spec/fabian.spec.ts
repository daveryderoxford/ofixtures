/**  */
import { describe, it, expect } from 'vitest';
import { EntryData } from 'fixtures/entries/entry.js';
import { Fabian } from '../fixtures/entries/fabian.js';
import { fabianFile } from './fabian_data.js';

describe( 'Fabian data parser ', () => {

   it( 'Should parse race sigup data', () => {

      const rs = new Fabian();
      const events: EntryData[] = rs.parse( fabianFile );

    //  console.log(events);

      expect( events.length).toBe( 73 );

   } );

   it( 'Should load events from Fabian site', async ()  =>  {

      const rs = new Fabian();
      const events: EntryData[] = await rs.getEvents();

   //   console.log(events);

      expect( events.length).toBeGreaterThan( 0 );

   }, 40000 );

} );