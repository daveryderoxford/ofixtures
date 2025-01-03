/**  */
import { Status } from "@googlemaps/google-maps-services-js";
import { expect, spy, use } from 'chai';
import 'mocha';
import { googleLocationSearch, googleLocationService } from '../fixtures/google_search';

import { LatLong } from 'model/latlng';

const spies = require( 'chai-spies' );

use( spies );

const brentwoodlocation = { lat: 51.620475, lng: 0.3071749 }

describe( 'Convert place names to geographic coodrinated using Google Maps geoConvert  ', () => {

   it( 'Real google search request works', async () => {

      if ( !process.env.GOOGLE_MAPS_API_KEY ) {
         console.log( "ERROR: Set evnivroemnt variable with google maps key using 'export GOOGLE_MAPS_API_KEY=**********' before running test" );
      }

      const results = await googleLocationSearch( 'Brentwood',  brentwoodlocation );
      expect( results.lat ).to.be.closeTo( brentwoodlocation.lat, 0.00001 );
      expect( results.lng ).to.be.closeTo( brentwoodlocation.lng, 0.00001 );

   } ).timeout( 5000 );

   it( 'Return undefined if place is not known ', async () => {
      const results = await googleLocationSearch( 'xxxxxx', null );
      expect( results ).to.be.null;
   } ).timeout( 5000 );

   function makeGeocodeResponse( locs: LatLong[] ): any {
      const results = locs.map( loc => {
         return {
            geometry: {
               location: {
                  lat: loc.lat,
                  lng: loc.lng
               }
            }
         }
      } );
    
      return { data: { results: results, status: Status.OK } }
   }

   const multipleSearchResults = makeGeocodeResponse( [
      { lat: 30, lng: 10 },
      brentwoodlocation,
      { lat: 10, lng: 10 },
   ] );

   it( 'First result within 80km of target location ', async () => {

      const searchSpy = spy.on( googleLocationService, 'geocode', () => Promise.resolve( multipleSearchResults ) );

      const results = await googleLocationSearch( 'Brentwood', brentwoodlocation );
      expect( results.lat ).to.be.closeTo( brentwoodlocation.lat, 0.00001 );
      expect( results.lng ).to.be.closeTo( brentwoodlocation.lng, 0.00001 );

      spy.restore( googleLocationService );

   } );

   it( 'Expect first result to be returned if null target is specified', async () => {

      const searchSpy = spy.on( googleLocationService, 'geocode', () => Promise.resolve( multipleSearchResults ) );

      const results = await googleLocationSearch( 'Brentwood', null );
      expect( results.lat ).to.be.closeTo( 30, 0.00001 );
      expect( results.lng ).to.be.closeTo( 10, 0.00001 );

      spy.restore( googleLocationService );

   } );

} );
