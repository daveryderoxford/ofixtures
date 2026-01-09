
import { describe, it, expect } from 'vitest';
import { PostCodeLookup, LatLong } from '../fixtures/postcode.js';


const postcodes = [ "TW18 2AB", "CM15 8BN" ];

const locations: LatLong[] = [
   {
      "lat": 51.43116,
      "lng": -0.508208,
   },
   {
      "lat": 51.617486,
      "lng": 0.313158,
   }
];

describe( 'Postcode IO', () => {

   const lookup = new PostCodeLookup();

   it( 'should convert postcodes to location', async () => {

      const results = await lookup.postcodeToLocation( postcodes );

      expect( results.length ).toBe( 2 );

      expect( results ).toEqual( locations );

   } );

   it( 'should convert lat long to postcode', async () => {

      const results = await lookup.latLongToPostcode( locations );

      expect( results.length ).toBe( 2 );
      expect( results ).toEqual( postcodes );

      expect( results[ 0 ] ).toBe( "TW18 2AB" );
      expect( results[ 1 ] ).toBe( "CM15 8BN" );

   } );

   it( 'should handle large request Postcode request (over 100)', async () => {
      const largePostcodes = Array<string>( 201 ).fill( postcodes[0] );
      largePostcodes.push( postcodes[ 1 ]);

      const results = await lookup.postcodeToLocation( largePostcodes );

      expect( results.length).toBe(202);

      expect( results[ 101 ] ).toEqual( locations[ 0 ]);
      expect( results[ 200 ] ).toEqual( locations[0] );
      expect( results[ 201 ] ).toEqual( locations[1] );

   }, 30000 );

   it( 'should handle large request lat long request (over 100)', async () => {
      const largeLocations = Array<LatLong>( 201 ).fill( locations[ 0 ] );
      largeLocations.push( locations[ 1 ] );

      const results = await lookup.latLongToPostcode( largeLocations );

      expect( results.length ).toBe( 202 );

      expect( results[ 101 ] ).toBe( postcodes[ 0 ] );
      expect( results[ 200 ] ).toBe( postcodes[ 0 ] );
      expect( results[ 201 ] ).toBe( postcodes[ 1 ] );

   }, 30000 );

   it( 'should return null lat long if postcode is not found', async () => {

      const p = [ "XX18 2XX", "CM15 8BN" ];
      const results = await lookup.postcodeToLocation( p );

      expect( results.length ).toBe( 2 );
      expect( results[ 0 ] ).toBeNull();

   } );

   it( 'should return empty string if postcode is not found', async () => {

      const l = [ { "lat": 20.0, "lng": -0.508227 } ]; // lat of 20 outside uk

      const results = await lookup.latLongToPostcode( l );

      expect( results.length ).toBe( 1 );
      expect( results[ 0 ] ).toBe( "" );

   } );

}, 10000 );
