/**  */
import { describe, it, expect } from 'vitest';
import { googleLocationBOFFixtures, testBOFPDAFile } from './BOFPDATestData.js';
import { BOFPDParseData, BOFPDParser } from '../fixtures/bof_pda_parse.js';


describe( 'BOF PDA Fixtures fiile parser ', () => {

   it( 'Should parse all fields incluing a grid reference column', () => {

      const parser = new BOFPDParser();
      const bofFixtures: BOFPDParseData[] = parser.parseBOFPDAFile( testBOFPDAFile );

      // Row with grid reference
      expect( bofFixtures.length ).toEqual( 1267 );
      expect( bofFixtures[ 0 ].date ).toEqual( '2019-03-24T00:00:00.000Z' );
      expect( bofFixtures[ 0 ].id ).toEqual( 'bof-72446' );
      expect( bofFixtures[ 0 ].name ).toEqual( 'SROC Red Rose Classic' );

      expect( bofFixtures[ 0 ].BOFLink ).toEqual( 'index.php?pg=event&amp;event=72446&bpg=' );

      expect( bofFixtures[ 0 ].club ).toEqual( 'SROC' );
      expect( bofFixtures[ 0 ].clubURL ).toEqual( 'http://www.sroc.org' );

      expect( bofFixtures[ 0 ].postcode ).toEqual( '' );  // Grid reference in colunm not a postcode
      expect( bofFixtures[ 0 ].region ).toEqual( 'NWOA' );
      expect( bofFixtures[ 0 ].grade ).toEqual( 'National' );

      expect( bofFixtures[ 0 ].area ).toEqual( 'Hampsfell' );
      expect( bofFixtures[ 0 ].nearestTown ).toEqual( 'Grange over Sands' );
      expect( bofFixtures[ 0 ].gridRefStr ).toEqual( 'SD393805' );
   } );

   it('Should parse records in new format with Google location links rather than streetmap ', () => {

      const parser = new BOFPDParser();
      const bofFixtures: BOFPDParseData[] = parser.parseBOFPDAFile(googleLocationBOFFixtures);

      // console.log(JSON.stringify(bofFixtures) );

      // Row with postcode 
      expect(bofFixtures[0].postcode).toEqual('GL4 8HG');
      expect(bofFixtures[0].gridRefStr).toEqual('');

      // Row 2 another postcode
      expect(bofFixtures[1].postcode).toEqual('GL53 9EG');

      // Row 3 short postcode also treated as missing. - OK are rare
      expect(bofFixtures[2].postcode).toEqual('');

      // Row 4 no postcode
      expect(bofFixtures[3].postcode).toEqual('');

   });

   it( 'Should parse record with no postcode or grid reference', () => {

      const parser = new BOFPDParser();
      const bofFixtures: BOFPDParseData[] = parser.parseBOFPDAFile( testBOFPDAFile );

      // Row without any postcode or grid ref  (Spring series 4, Whitehaven)
      expect( bofFixtures[ 1 ].name ).toEqual( 'Spring series 4, Whitehaven' );
      expect( bofFixtures[ 1 ].postcode ).toEqual( '' );
      expect( bofFixtures[ 1 ].gridRefStr ).toEqual( '' );

   } );

   it( 'Should parse record with postcode data and no grid reference', () => {

      const parser = new BOFPDParser();
      const bofFixtures: BOFPDParseData[] = parser.parseBOFPDAFile( testBOFPDAFile );

      // Row with postcode  (Postcode)
      expect( bofFixtures[ 2 ].name ).toEqual( 'Postcode' );
      expect( bofFixtures[ 2 ].postcode ).toEqual( 'TA1 2RH' );
      expect( bofFixtures[ 2 ].gridRefStr ).toEqual( '' );

   } );

   it( 'Should parse the complete file', () => {

      const parser = new BOFPDParser();
      const bofFixtures: BOFPDParseData[] = parser.parseBOFPDAFile( testBOFPDAFile );

      const expectedLength = 1267;
      // Last row (WOC 2022 Public Races)
      expect( bofFixtures.length ).toEqual( expectedLength );
      expect( bofFixtures[ expectedLength - 1 ].date ).toEqual( '2022-07-13T00:00:00.000Z' );
      expect( bofFixtures[ expectedLength - 1 ].name ).toEqual( 'WOC 2022 Public Races' );

   } );

   it( 'Should parse activity', () => {

      const parser = new BOFPDParser();
      const bofFixtures: BOFPDParseData[] = parser.parseBOFPDAFile( testBOFPDAFile );

      expect( bofFixtures[ 2 ].name ).toEqual( 'Postcode' );
      expect( bofFixtures[ 2 ].id ).toEqual( 'bof-activity26377' );

   } );

} );
