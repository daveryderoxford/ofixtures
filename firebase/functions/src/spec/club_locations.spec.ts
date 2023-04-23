import { expect } from 'chai';
import * as fs from 'fs';
import 'mocha';
import { Fixture } from 'model/fixture';
import { clubLocationFromFixtures } from '../fixtures/club_locations';
import { testFixtures, } from './club_locations_fixtures.spec';

function readAllFixtures(): Fixture[] {
   try {
      const data = fs.readFileSync( '/Users/user/Documents/workspace/ofixtures/firebase/functions/src/spec/all_fixtures.json', 'utf8' );
      return JSON.parse( data );
   } catch ( err ) {
      console.error( err );
   }
}

describe( 'Club Locations', () => {

   it.only( 'should obtain club locations form the currently live fixture file ', async () => {

      const allFixtures = readAllFixtures();
      const clubLocations = clubLocationFromFixtures( allFixtures ); 

      console.log( JSON.stringify( clubLocations ) );

      expect( clubLocations.length ).to.equal( 88 );
 
   } ).timeout( 20000 ); 

   it( 'Should compute the average for fixture location sources postcode and grid ref ',  () => {

      const clubLocations = clubLocationFromFixtures( testFixtures ); 

      // 2 Clubs with at least one fixture with loc source postcode or grid
      expect( clubLocations.length).to.equal(2);

      const sroc = clubLocations[1];
      
      expect( sroc.shortName).to.equal("SROC");

      expect( sroc.latLng.lat ).to.closeTo( 54.3, 0.00001 );
      expect( sroc.latLng.lng ).to.closeTo( -2.8, 0.00001 );

      expect( clubLocations[0].shortName ).to.equal("DEE");

   //   console.log( JSON.stringify( clubLocations ));

   } ).timeout( 20000 );

});
