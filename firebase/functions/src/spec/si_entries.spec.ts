/**  */
import { describe, it, expect } from 'vitest';
import { EntryData } from '../fixtures/entries/entry.js';
import { SIEntries } from '../fixtures/entries/si_entries.js';
import { siEntriesFile } from './si_entries_data.js';

describe( 'SI Entries data parser ', () => {

   it( 'Should parse race sigup data', () => {

      const rs = new SIEntries();
      const events: EntryData[] = rs.parse( siEntriesFile );

 //   console.log(events);

      expect( events.length).toBe( 31 );

   } );

   it( 'Should load events from SI Entries site', async ()  =>  {

      const rs = new SIEntries();
      const events: EntryData[] = await rs.getEvents();

   //   console.log(events);

      expect( events.length).toBeGreaterThan( 0 );

   }, 40000 );

} );