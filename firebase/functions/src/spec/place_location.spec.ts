/**  */
import { expect } from 'chai';
import 'mocha';
import { convertPlace } from '../fixtures/place_location';


describe( 'Convert place names to geographic coodrinated using Google Maps geoConvert  ', () => {

   it( 'Return the geographic coordinate of known place names', async () => {

      if ( !process.env.GOOGLE_MAPS_API_KEY ) {
         console.log( "ERROR: Set evnivroemnt variable with google maps key using 'export GOOGLE_MAPS_API_KEY=**********' before running test" );
      }

      const results = await convertPlace( 'Brentwood', null, 'SN' );
      expect( results.lat ).to.be.closeTo( 51.620475, 0.00001 );
      expect( results.lng ).to.be.closeTo( 0.3071749, 0.00001 );

   } ).timeout( 5000 );

   it( 'Return undefined if place is not known ', async () => {
      const results = await convertPlace( 'xxxxxx', null, 'SN' );
      expect( results ).to.be.null;
   } ).timeout( 5000 );;

} )
