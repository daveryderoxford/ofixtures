import { describe, it, expect } from 'vitest';
import fs from 'fs';
import { Fixture } from 'model/fixture.js';
import { clubLocationFromFixtures } from '../fixtures/club_locations.js';
import { testFixtures, } from './club_locations_fixtures.js';

function readAllFixtures(): Fixture[] {
   try {
      const data = fs.readFileSync( './src/spec/all_fixtures.json', 'utf8' );
      return JSON.parse( data );
   } catch ( err ) {
      console.error( err );
   }
}

describe( 'Club Locations', () => {

   it( 'should obtain club locations form the currently live fixture file ', async () => {

      const allFixtures = readAllFixtures();
      const clubLocations = clubLocationFromFixtures( allFixtures ); 

      // console.log( JSON.stringify( clubLocations ) );

      expect( clubLocations.length ).toBe( 88 );
 
   }, 20000 ); 

   it( 'Should compute the average for fixture location sources postcode and grid ref ',  () => {

      const clubLocations = clubLocationFromFixtures( testFixtures ); 

      // 2 Clubs with at least one fixture with loc source postcode or grid
      expect( clubLocations.length).toBe(2);

      const sroc = clubLocations.find( c => c.shortName === 'SROC' );
      expect( sroc ).toBeDefined();
      expect( sroc!.latLng.lat ).toBeCloseTo( 54.325, 3 );
      expect( sroc!.latLng.lng ).toBeCloseTo( -2.775, 3 );

      const sn = clubLocations.find( c => c.shortName === 'SN' );
      expect( sn ).toBeDefined();

      // Explicitly test filtering conditions
      // DEE should be filtered out because lat is > 90
      const dee = clubLocations.find( c => c.shortName === 'DEE' );
      expect( dee ).toBeUndefined();

      // NoLocation should be filtered out because locSource is empty/null latLong
      const noLocation = clubLocations.find( c => c.shortName === 'NoLocation' );
      expect( noLocation ).toBeUndefined();

   //   console.log( JSON.stringify( clubLocations ));

   }, 20000 );

});
