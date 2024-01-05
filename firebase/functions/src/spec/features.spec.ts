import { expect, spy, use } from 'chai';
import * as admin from "firebase-admin";
import 'mocha';
import { Fixture } from "model/fixture";
import { EntryData } from '../fixtures/entries/entry';
import { Fabian } from '../fixtures/entries/fabian';
import { RaceSignup } from '../fixtures/entries/racesignup';
import { SIEntries } from '../fixtures/entries/si_entries';
import { Fixtures } from '../fixtures/fixtures';
import { clubLocationBOFFixtures, smalltestBOFPDAFile } from './BOFPDATestData.spec';

const spies = require( 'chai-spies' );

const expectedFixtures: Fixture[] = [
   {
      id: "bof-72446",
      date: "2019-03-24T00:00:00.000Z",
      name: "SROC Red Rose Classic",
      grade: "National",
      clubURL: "http://www.sroc.org",
      club: "SROC",
      association: "NWOA",
      latLong: { lat: 54.216616169229894, lng: -2.9323406028649956 },  // SD393805
      postcode: "LA11 6HL",
      area: "Hampsfell",
      nearestTown: "Grange over Sands",
      type: "Foot",
      discipline: "Unknown",
      locSource: 'gridref',
      webpage: "index.php?pg=event&amp;event=72446&bpg="
   },
   {
      id: "bof-76012",
      date: "2019-03-28T00:00:00.000Z",
      name: "Spring series 4, Whitehaven",
      grade: "Club",
      clubURL: "http://www.wcoc.co.uk",
      club: "WCOC",
      association: "NWOA",
      area: "",
      nearestTown: "Whitehaven",
      postcode: "",
      type: "Foot",
      discipline: "Unknown",
      latLong: {
         lat: 54.549699,
         lng: -3.589233
      },
      locSource: "google",
      webpage: "index.php?pg=event&amp;event=76012&bpg="
   },
   {
      id: "bof-activity26377",
      date: "2019-03-30T00:00:00.000Z",
      name: "Postcode",
      grade: "Local",
      clubURL: "http://www.quantockorienteers.co.uk",
      club: "QO",
      association: "SWOA",
      postcode: "TA1 2RH",
      latLong: { lat: 51.010333, lng: -3.073797 },
      locSource: 'postcode',
      area: "Blackbrook and Holway",
      nearestTown: "Taunton",
      type: "Foot",
      discipline: "Unknown",
      webpage: "index.php?pg=event&amp;activity=26377&bpg="
   }
];

const clubs = [
   { "shortName": "BADO", "latLng": { "lat": 51.22570518260315, "lng": -1.3354823410909458 } },
   { "shortName": "SROC", "latLng": { "lat": 51.84408218066901, "lng": -3.0639699524053547 } },
   { "shortName": "WIGHTO", "latLng": { "lat": 49.76680881527482, "lng": -7.557159802041799 } }
];

const sientries: EntryData[] = [
   {
     date: "2019-03-24T00:00:00.000Z",
     club: "SROC",
     title: "match SROC",
     entruUrl: "https://testurl",
     status: "Open"
   }
];
const fabianEvents: EntryData[]  = [
   {
      date: "2019-03-24T00:00:00.000Z",
      club: "DVO",
      title: "no match SROC",
      entruUrl: "https://testurl",
      status: "Closed"
    }
];
const racesignupEvents: EntryData[]  = [
   {
      date: "2019-03-24T00:00:00.000Z",
      club: "QO",
      title: "match QO",
      entruUrl: "https://testurl2",
      status: "Closed"
    }
];

const firebaseConfig = {projectId:"ofixtures-2a7d5",storageBucket:"ofixtures-2a7d5.appspot.com",locationId:"europe-west2"};

describe( 'Fxtures', () => {

   use( spies );

   it.only( 'should process BOF fixture HTML with gridref/postcode locations ', async () => {

      admin.initializeApp( firebaseConfig );

      const fixtures = new Fixtures( admin.storage() );

      const spyLoadBOF = spy.on( fixtures, 'loadBOFPDA', () => Promise.resolve( smalltestBOFPDAFile ) );

      const spyLoadAdditional = spy.on( fixtures, 'loadAdditionalEvents', () => Promise.resolve( [] ) );

      const spyClubs = spy.on( fixtures, 'loadClubLocations', () => Promise.resolve( clubs ) );

      const spySave = spy.on( fixtures, 'saveToStorage', ( fix: Fixture[] ) => {
         expect( fix ).to.deep.equal( expectedFixtures );
         return Promise.resolve();
      } );

      const spyRG = spy.on( fixtures, 'addRoutegadgetMaps', ( fix: Fixture[] ) => Promise.resolve() );

      const spyFabian = spy.on( Fabian.prototype, "getEvents", () => Promise.resolve( fabianEvents ));
      const spySientries = spy.on( SIEntries.prototype, "getEvents", () => Promise.resolve( sientries ));
      const spyRS = spy.on( RaceSignup.prototype, "getEvents", () => Promise.resolve( racesignupEvents ));

      // Stub adding entriy urls 
      const spyEntries = spy.on( fixtures, 'addEntryDetails', ( fix: Fixture[] ) => {
         return Promise.resolve();
      } );

      await fixtures.processFixtures();

      expect( spyLoadBOF ).to.have.been.called();
      expect( spyRG ).to.have.been.called();


   } ).timeout( 20000 );

} );

it( 'should should use club location if lat long not avalaible from gridref/postcaode/google', async () => {

   admin.initializeApp( firebaseConfig );

   const fixtures = new Fixtures( admin.storage() );

   const spyLoadBOF = spy.on( fixtures, 'loadBOFPDA', returns => Promise.resolve( [clubLocationBOFFixtures] ) );
   const spyLoadAdditional = spy.on( fixtures, 'loadAdditionalEvents', () => Promise.resolve( [] ) ); 
   const spyClubs = spy.on( fixtures, 'loadClubLocations', () => Promise.resolve( clubs ) );
   const spyRG = spy.on( fixtures, 'addRoutegadgetMaps', ( fix: Fixture[] ) => Promise.resolve() );
   const spyEntries = spy.on( fixtures, 'addEntryDetails', ( fix: Fixture[] ) => Promise.resolve() );

   const spySave = spy.on( fixtures, 'saveToStorage', ( fix: Fixture[] ) => {
      // SWOC found
      expect( fix[0].latLong ).to.deep.equal( clubs[1].latLng );
      expect( fix[0].locSource ).to.equal( 'club' );

      // No club found
      expect( fix[1].latLong ).to.be.undefined;
      expect( fix[1].locSource ).to.equal( '' );
      return Promise.resolve();
   } );

   await fixtures.processFixtures();

} ).timeout( 20000 );

it.only( 'should process  entrires ', async () => {

   admin.initializeApp( firebaseConfig );

   const fixtures = new Fixtures( admin.storage() );

   const spyLoadAdditional = spy.on( fixtures, 'loadAdditionalEvents', () => Promise.resolve( [] ) );

   const spyClubs = spy.on( fixtures, 'loadClubLocations', () => Promise.resolve( clubs ) );

   const spySave = spy.on( fixtures, 'saveToStorage', ( fix: Fixture[] ) => {
      expect( fix ).to.deep.equal( expectedFixtures );
      return Promise.resolve();
   } );

   // Stub adding Routegadget maps
   const spyRG = spy.on( fixtures, 'addRoutegadgetMaps', ( fix: Fixture[] ) => { return Promise.resolve();} );

   await fixtures.processFixtures();

   expect( spyRG ).to.have.been.called();

} ).timeout( 20000 );




