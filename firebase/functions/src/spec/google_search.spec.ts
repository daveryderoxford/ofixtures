/**  */
import { Status } from "@googlemaps/google-maps-services-js";
import { describe, it, expect, vi } from 'vitest';
import { LatLong } from 'model/latlng.js';
import { googleLocationSearch, googleLocationService } from '../fixtures/google_search.js';

const brentwoodlocation = { lat: 51.620475, lng: 0.3071749 }

describe( 'Convert place names to geographic coodrinated using Google Maps geoConvert  ', () => {

   it( 'Real google search request works', async () => {

      if ( !process.env.GOOGLE_MAPS_API_KEY ) {
         console.log( "ERROR: Set evnivroemnt variable with google maps key using 'export GOOGLE_MAPS_API_KEY=**********' before running test" );
      }

      const results = await googleLocationSearch( 'Brentwood',  brentwoodlocation );
      expect( results.lat ).toBeCloseTo( brentwoodlocation.lat, 5 );
      expect( results.lng ).toBeCloseTo( brentwoodlocation.lng, 5 );

   }, 5000 );

   it( 'Return undefined if place is not known ', async () => {
      const results = await googleLocationSearch( 'xxxxxx', null );
      expect( results ).toBeNull();
   }, 5000 );

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

      const searchSpy = vi.spyOn( googleLocationService, 'geocode' ).mockResolvedValue( multipleSearchResults as any );

      const results = await googleLocationSearch( 'Brentwood', brentwoodlocation );
      expect( results.lat ).toBeCloseTo( brentwoodlocation.lat, 5 );
      expect( results.lng ).toBeCloseTo( brentwoodlocation.lng, 5 );

      searchSpy.mockRestore();

   } );

   it( 'Expect first result to be returned if null target is specified', async () => {

      const searchSpy = vi.spyOn( googleLocationService, 'geocode' ).mockResolvedValue( multipleSearchResults as any );

      const results = await googleLocationSearch( 'Brentwood', null );
      expect( results.lat ).toBeCloseTo( 30, 5 );
      expect( results.lng ).toBeCloseTo( 10, 5 );

      searchSpy.mockRestore();

   } );

} );
