/**  */
import { expect } from 'chai';
import 'mocha';
import { RaceSignup } from '../fixtures/entries/racesignup';
import { realRacesignupFile } from './racesignup_data.spec';
import { EntryData } from 'fixtures/entries/entry';

describe( 'RaceSignup data parser ', () => {

   it( 'Should parse race sigup data', () => {

      const rs = new RaceSignup();
      const events: EntryData[] = rs.parse( realRacesignupFile );

      console.log(events);

      expect( events.length).to.equal( 69 );

   } );

   it( 'Should load events from racesignup site', async ()  =>  {

      const rs = new RaceSignup();
      const events: EntryData[] = await rs.getEvents();

   //   console.log(events);

      expect(events.length).greaterThan( 0 );

   } ).timeout( 40000 );

} );