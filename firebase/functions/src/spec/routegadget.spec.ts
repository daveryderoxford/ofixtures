import { expect } from 'chai';
import 'mocha';
import { Routegadget } from '../fixtures/routegadget';
import { RGSITES } from '../fixtures/routegadgetclubs';

const sn = {
   "name": "Southern Navigators",
   "shortName": "sn",
   "rgUKPrifix": "",
   "isNonStandard": null,
   "baseURL": "https://www.sn.routegadget.co.uk/",
   "notes": ""
};

const int = {
   "name": "Interlopers",
   "shortName": "int",
   "rgUKPrifix": "interlopers",
   "isNonStandard": null,
   "baseURL": "https://www.interlopers.routegadget.co.uk/",
   "notes": ""
};

describe( 'Routegaedget', () => {

   it( 'should read routegadget events for specified clubs', async () => {

      const gr = new Routegadget();

      await gr.initialise();

      /*  console.log( "=== Clubs Map details ====" );
        for ( const [key, events] of gr.clubs ) {
           console.log( key + "  Event count: " + events.length );
        } */

      expect( gr.rgSitesMap.size ).to.equal( RGSITES.length );

      const ret = gr.getRoutegadgetData( 'xxx', 'SN' );
      expect( ret.baseURL ).to.equal( sn.baseURL );

   } ).timeout( 20000 );

   it( 'should return null if event does not exist in routegagdte', async () => {
      const gr = new Routegadget();

      await gr.initialise( [sn] );


   } );

   it( 'should read clubs events for routegadget', async () => {

      const rg = new Routegadget();

      await rg.initialise( [sn] );

      const ret = rg.getRoutegadgetData( 'Merrist', 'XXX' );

      expect( ret).to.equal(null);
   } );


   it( 'should load events for a specified area', async () => {

      const gr = new Routegadget();

      await gr.initialise( [sn] );

      const ret = gr.getRoutegadgetData( 'Merrist', 'SN' );

      expect( ret.baseURL ).to.equal( sn.baseURL );
      expect( ret.maps.length ).to.equal( 5 );
      expect( ret.maps[1] ).to.deep.equal( { id: 109, name: "Merrist Wood Saturday Series", mapfile: "106.gif"} );

   } );

   it( 'search should be case insensitive', async () => {

      const rg = new Routegadget();

      await rg.initialise( [sn] );

      const ret = rg.getRoutegadgetData( 'mErrist', 'SN' );

      expect( ret.maps.length ).to.equal( 5 );
      expect( ret.maps[0] ).to.deep.equal( { id: 173, name: "Merrist Woods Saturday Series", mapfile: "171.gif" } );

   } );

   it( 'When finding events for area should ignore common keywords', async () => {

      const rg = new Routegadget();
      let ret;

      await rg.initialise( [sn] );

      // Ignore common keywords
      //Note: the whole area string will still match so we specify multipe skipped words
      expect( rg.getRoutegadgetData( 'Common Woods', 'SN' ).maps.length ).to.equal( 0 );
      expect( rg.getRoutegadgetData( 'woods and', 'SN' ).maps.length ).to.equal( 0 );

      // Southwood is found and country, part are ignored
      ret = rg.getRoutegadgetData( 'Southwood Country Park', 'SN' )
      expect( ret.maps.length ).to.equal( 3 );
      expect( ret.maps[2] ).to.deep.equal( { id: 140, name: 'Southwood Country Park', mapfile: "138.gif" } );

      // Two letter word is ignored.  
      expect( rg.getRoutegadgetData( 'Common st', 'SN' ).maps.length ).to.equal( 0 );
   } );

   it( 'and should be excluded (Interlopers test)', async () => {

      const rg = new Routegadget();

      await rg.initialise( [int] );

      const ret = rg.getRoutegadgetData( "Holyrood and Craigmillar", 'INT' );

      //  6 events expected for interlopers containg Craigmillar
      expect( ret.maps.length ).to.equal( 6 );

   } );

   it( 'Two valid words returns events for both areas', async () => {

      const rg = new Routegadget();

      await rg.initialise( [sn] );

      const ret = rg.getRoutegadgetData( 'Merrist Wisley', 'SN' );

      //  12 events for both wisley and merrist
      expect( ret.maps.length ).to.equal( 12 );

   } );

   it( 'Blank area should not find any maps', async () => {

      const rg = new Routegadget();

      await rg.initialise( [sn] );

      const ret = rg.getRoutegadgetData( '', 'SN' );

      expect( ret.maps.length ).to.equal( 0 );

   } );  

} );
