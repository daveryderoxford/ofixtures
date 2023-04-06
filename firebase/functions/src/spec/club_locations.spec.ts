import { expect } from 'chai';
import { calcClubLocations } from '../fixtures/club_locations';
import 'mocha';
import { Fixture } from 'model/fixture';
import * as request from "request-promise";
import { testFixtures } from './club_locsations_fixtures';

describe.only( 'Club Locations', () => {

   it.only( 'should obtain club locations form the currently live fixture file ', async () => {

      // Read fitures file 

    //  const fixturesURL = "https://storage.cloud.google.com/ofixtures-2a7d5.appspot.com/fixtures/uk";
     // const text = await request( fixturesURL, { method: "get" } );
   //   const fixtures = JSON.parse( text ) as Fixture[];

    //  const clubLocations = calcClubLocations( fixtures );

   //  console.log( JSON.stringify( clubLocations ) )


   } ).timeout( 20000 );

   it.only( 'Should compute the average for location sources postcode and grid ref ',  () => {

      const clubLocations = calcClubLocations( testFixtures ); 

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
