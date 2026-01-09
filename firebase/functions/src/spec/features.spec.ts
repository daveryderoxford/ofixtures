import { describe, it, expect, vi } from 'vitest';
import { initializeApp } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { Fixture } from "model/fixture.js";
import { EntryData } from '../fixtures/entries/entry.js';
import { Fabian } from '../fixtures/entries/fabian.js';
import { RaceSignup } from '../fixtures/entries/racesignup.js';
import { SIEntries } from '../fixtures/entries/si_entries.js';
import { Fixtures } from '../fixtures/fixtures.js';
import { clubLocationBOFFixtures, smalltestBOFPDAFile } from './BOFPDATestData.js';

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
      status: "Open",
      source: 'Racesignup'
   }
];
const fabianEvents: EntryData[] = [
   {
      date: "2019-03-24T00:00:00.000Z",
      club: "DVO",
      title: "no match SROC",
      entruUrl: "https://testurl",
      status: "Closed",
      source: 'Racesignup'
   }
];
const racesignupEvents: EntryData[] = [
   {
      date: "2019-03-24T00:00:00.000Z",
      club: "QO",
      title: "match QO",
      entruUrl: "https://testurl2",
      status: "Closed",
      source: 'Racesignup'
   }
];

const firebaseConfig = { projectId: "ofixtures-2a7d5", storageBucket: "ofixtures-2a7d5.appspot.com", locationId: "europe-west2" };

// Requires firbase emulator so skip for the moment 
// Needs test emulator support as in splitsbrowser
describe.skip('Fxtures', () => {

   it('should process BOF fixture HTML with gridref/postcode locations ', async () => {

      initializeApp(firebaseConfig);

      const fixtures = new Fixtures(getStorage());

      const spyLoadBOF = vi.spyOn(fixtures as any, 'loadBOFPDA').mockResolvedValue(smalltestBOFPDAFile);

      const spyLoadAdditional = vi.spyOn(fixtures as any, 'processAdditonalFixtures').mockResolvedValue([]);

      const spyClubs = vi.spyOn(fixtures as any, 'loadClubLocations').mockResolvedValue(clubs);

      const spySave = vi.spyOn(fixtures as any, 'saveToStorage').mockImplementation((fix: Fixture[]) => {
         expect(fix).toEqual(expectedFixtures);
         return Promise.resolve();
      });

      const spyRG = vi.spyOn(fixtures as any, 'addRoutegadgetMaps').mockResolvedValue(undefined);

      vi.spyOn(Fabian.prototype, "getEvents").mockResolvedValue(fabianEvents);
      vi.spyOn(SIEntries.prototype, "getEvents").mockResolvedValue(sientries);
      vi.spyOn(RaceSignup.prototype, "getEvents").mockResolvedValue(racesignupEvents);

      // Stub adding entriy urls 
      vi.spyOn(fixtures, 'addEntryDetails').mockImplementation((fix: Fixture[]) => {
         return Promise.resolve();
      });

      await fixtures.processFixtures();

      expect(spyLoadBOF).toHaveBeenCalled();
      expect(spyRG).toHaveBeenCalled();


   }, 20000);

it('should should use club location if lat long not avalaible from gridref/postcaode/google', async () => {

   // initializeApp(firebaseConfig);

   const fixtures = new Fixtures(getStorage());

   vi.spyOn(fixtures as any, 'loadBOFPDA').mockResolvedValue([clubLocationBOFFixtures]);
   vi.spyOn(fixtures as any, 'processAdditonalFixtures').mockResolvedValue([]);
   vi.spyOn(fixtures as any, 'loadClubLocations').mockResolvedValue(clubs);
   vi.spyOn(fixtures, 'addRoutegadgetMaps').mockResolvedValue(undefined);
   vi.spyOn(fixtures, 'addEntryDetails').mockResolvedValue(undefined);

   vi.spyOn(fixtures as any, 'saveToStorage').mockImplementation((fix: Fixture[]) => {
      // SWOC found
      expect(fix[0].latLong).toEqual(clubs[1].latLng);
      expect(fix[0].locSource).toBe('club');

      // No club found
      expect(fix[1].latLong).toBeUndefined();
      expect(fix[1].locSource).toBe('');
      return Promise.resolve();
   });

   await fixtures.processFixtures();

}, 20000);

it('should process  entrires ', async () => {

  // initializeApp(firebaseConfig);

   const fixtures = new Fixtures(getStorage());

   const spyLoadAdditional = vi.spyOn(fixtures as any, 'processAdditonalFixtures').mockResolvedValue([]);

   const spyClubs = vi.spyOn(fixtures as any, 'loadClubLocations').mockResolvedValue(clubs);

   vi.spyOn(fixtures as any, 'saveToStorage').mockImplementation((fix: Fixture[]) => {
      expect(fix).toEqual(expectedFixtures);
      return Promise.resolve();
   });

   // Stub adding Routegadget maps
   const spyRG = vi.spyOn(fixtures, 'addRoutegadgetMaps').mockImplementation((fix: Fixture[]) => { return Promise.resolve(); });

   await fixtures.processFixtures();

   expect(spyRG).toHaveBeenCalled();

}, 20000);

});
