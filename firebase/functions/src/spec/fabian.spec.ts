/**  */
import { expect } from 'chai';
import { EntryData } from 'fixtures/entries/entry';
import 'mocha';
import { Fabian } from '../fixtures/entries/fabian';
import { fabianFile } from './fabian_data.spec';

describe( 'Fabian data parser ', () => {

   it( 'Should parse race sigup data', () => {

      const rs = new Fabian();
      const events: EntryData[] = rs.parse( fabianFile );

    //  console.log(events);

      expect( events.length).to.equal( 73 );

   } );

   it( 'Should load events from Fabian site', async ()  =>  {

      const rs = new Fabian();
      const events: EntryData[] = await rs.getEvents();

   //   console.log(events);

      expect( events.length).greaterThan( 0 );

   } ).timeout( 40000 );

} );