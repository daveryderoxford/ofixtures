/**  */
import { expect } from 'chai';
import { EntryData } from '../fixtures/entries/entry';
import { SIEntries } from '../fixtures/entries/si_entries';
import 'mocha';
import { siEntriesFile } from './si_entries_data.spec';

describe( 'SI Entries data parser ', () => {

   it( 'Should parse race sigup data', () => {

      const rs = new SIEntries();
      const events: EntryData[] = rs.parse( siEntriesFile );

 //   console.log(events);

      expect( events.length).to.equal( 31 );

   } );

   it( 'Should load events from SI Entries site', async ()  =>  {

      const rs = new SIEntries();
      const events: EntryData[] = await rs.getEvents();

   //   console.log(events);

      expect( events.length).greaterThan( 0 );

   } ).timeout( 40000 );

} );