import * as admin from "firebase-admin";
import request from "request-promise";
import { Fixture, LocationSource, } from "../model/fixture.js";
import { LatLong } from "../model/latlng.js";
import { EventGrade } from "../model/oevent.js";
import { readAdditionalFixtures } from "./additional_fixtures.js";
import { BOFPDParser } from "./bof_pda_parse.js";
import { ClubLocation, loadClubLocations } from "./club_locations.js";
import { Entries } from "./entries/entry.js";
import { GT_OSGB } from "./geo_conversion.js";
import { OTools } from './otools.js';
import { LatLong as LatLongPIO, PostCodeLookup } from "./postcode.js";
import { Routegadget } from "./routegadget.js";
import { findAddressLocation } from './address_search.js';

const NUM_RECENT_FIXTURES = 100;

export class Fixtures {
   readonly BOFPDAURL =
      "https://www.britishorienteering.org.uk/event_diary_pda.php";

   lookup = new PostCodeLookup();

   clubs: ClubLocation[];

   version = "2.2.0";

   constructor(private storage: admin.storage.Storage) { }

   /** Read BOF PDA data from URL and parse it. */
   public async processFixtures() {

      console.log("Fixtures version " + this.version);

      console.log("Loading Club locations");
      this.clubs = await this.loadClubLocations();

      console.log("Processing BOF Fixtures");
      const bofFixtures = await this.processBOFFixtures();

      console.log("Processing Additional fixtures");
      const additionalFixtures = await this.processAdditonalFixtures();

      const fixtures = bofFixtures.concat(additionalFixtures);
      fixtures.sort((a, b) => a.date.localeCompare(b.date));

      console.log("Finding Routegadget maps");
      await this.addRoutegadgetMaps(fixtures);

      console.log("Finding entry details");
      await this.addEntryDetails(fixtures);

      console.log("Adding OTools event ID's");
      const otools = new OTools();
      await otools.addOToolsEventIds(fixtures);

      console.log("Saving fixture file");
      await this.saveToStorage(fixtures);

      this.writeLogSummary(fixtures);

      console.log("Done");

   }

   private async loadClubLocations(): Promise<ClubLocation[]> {
      return await loadClubLocations();
   }

   /** Make fixtures array for BOF fixturesd. */
   private async processBOFFixtures(): Promise<Fixture[]> {

      console.log("Loading BOF PDA Data");
      const text = await this.loadBOFPDA();

      console.log("Parsing BOF PDA Data");
      const parser = new BOFPDParser();
      const bofFixtures = parser.parseBOFPDAFile(text);

      //  Create fixture array
      const fixtures: Partial<Fixture>[] = bofFixtures.map(bof => {
         const fixture: Partial<Fixture> = {
            id: bof.id,
            date: bof.date,
            name: bof.name,
            club: bof.club,
            clubURL: bof.clubURL,
            area: bof.area,
            association: bof.region,
            nearestTown: bof.nearestTown,
            grade: this.mapGrade(bof.grade),
            type: "Foot",
            discipline: "Unknown",
            webpage: bof.BOFLink,
            locSource: ''
         };

         return fixture;
      });

      await this.calcPostCodes(fixtures, bofFixtures);
      await this.determineLatLongs(fixtures, bofFixtures);

      return fixtures as Fixture[];
   }

   private async processAdditonalFixtures(): Promise<Fixture[]> {

      console.log("Reading additional fixtures");
      const fixtures = await readAdditionalFixtures();

      const data = fixtures.map(f => {
         return {
            postcode: f.postcode,
            gridRefStr: f.gridRefString,
         };
      });
      await this.calcPostCodes(fixtures, data);

      const data2 = fixtures.map(f => {
         return {
            postcode: f.postcode,
            gridRefStr: f.gridRefString,
            area: f?.area,
            nearestTown: f?.nearestTown,
            club: f.club
         };
      });
      await this.determineLatLongs(fixtures, data2);

      return fixtures;

   }

   /** Sets Fixture postcodes for bof data for all values, determining postcode from latlong where necessary */
   private async calcPostCodes(fixtures: Partial<Fixture>[], data: { postcode: string, gridRefStr: string; }[]) {
      console.log("     Calculating postcodes");
      const latlongsToCalc: LatLongPIO[] = [];
      const fixturesToCalc: Partial<Fixture>[] = [];

      // Set postcodes for ones avalible from BOF data and identify ones that need to be calculated using postcode.io
      for (let i = 0; i < fixtures.length; i++) {
         if (data[i].postcode !== "") {
            fixtures[i].postcode = data[i].postcode;
         } else if (data[i].gridRefStr && data[i].gridRefStr !== "") {
            const loc = this.osgbToLatLong(data[i].gridRefStr);
            if (loc) {
               latlongsToCalc.push(loc);
               fixturesToCalc.push(fixtures[i]);
            }
         } else {
            fixtures[i].postcode = "";
         }
      }

      const postcodes = await this.lookup.latLongToPostcode(latlongsToCalc);

      for (let i = 0; i < postcodes.length; i++) {
         fixturesToCalc[i].postcode = postcodes[i];
      }
   }

   /** Sets Fixture latlong for bof data for all values, calculating from postcode where necessary */
   private async determineLatLongs(fixtures: Partial<Fixture>[], data: { postcode: string, gridRefStr: string, area: string, nearestTown: string, club: string; }[]) {
      console.log("     Calculating latlongs");

      const postcodesToCalc: string[] = [];
      const fixtuersToCalc: Partial<Fixture>[] = [];

      // Set latlongs for ones avalible from BOF data and identify ones that need to be calculated using postcode.io or google geolocation.
      // Default value for club is used if no other exist
      for (let i = 0; i < fixtures.length; i++) {
         const bof = data[i];
         const fix = fixtures[i];

         if (bof.gridRefStr && bof.gridRefStr !== "") {
            fix.latLong = this.osgbToLatLong(bof.gridRefStr);
            if (fix.latLong) {
               fix.locSource = 'gridref';
            } else {
               // console.log( `Fixture: Unable to parse grid ref string. Fixture', fix.id} club ${fix.club} date', fix.date} Grid ref', bof.gridRefStr}` );
               fix.locSource = '';
            }
         } else if (bof.postcode && bof.postcode !== "") {
            postcodesToCalc.push(bof.postcode);
            fixtuersToCalc.push(fix);
            fix.locSource = 'postcode';
         } else if (bof.area || bof.nearestTown) {
            const searchResult = await findAddressLocation(bof.area, bof.nearestTown, bof.club, this.latLngForClub(bof.club));
            fix.latLong = searchResult.location;
            fix.locSource  = searchResult.source;
           } 
      }

      const locations = await this.lookup.postcodeToLocation(postcodesToCalc);

      for (let i = 0; i < locations.length; i++) {
         fixtuersToCalc[i].latLong = locations[i];
      }

      // Set default latlong for club if we could not obtain from other sources
      fixtures.filter(fix => !fix.latLong).forEach(fix => {
         fix.latLong = this.latLngForClub(fix.club);
         fix.locSource = fix.latLong ? 'club' : '';
      });

   }

   private latLngForClub(clubname: string): LatLong | null {
      const club = this.clubs.find(c => c.shortName === clubname);
      return club?.latLng;
   }

   private osgbToLatLong(gridRefStr: string): LatLong {
      const osgb = new GT_OSGB();
      if (osgb.parseGridRef(gridRefStr)) {
         const wgs84 = osgb.getWGS84();
         return { lat: wgs84.latitude, lng: wgs84.longitude };
      } else {
         return null;
      }
   }

   private mapGrade(bofGrade: string): EventGrade {
      switch (bofGrade) {
         case "Activity":
            return "Local";
         case "Local":
            return "Club";
         case "Regional":
            return "Regional";
         case "National":
            return "National";
         case "Major":
            return "International";
         case "International":
            return "International";
         default:
            throw new Error("Fixtures: Unexpected bof grade encountered: " + bofGrade);
      }
   }

   async addRoutegadgetMaps(fixtures: Fixture[]) {
      const rg = new Routegadget();
      await rg.initialiseFromCache();

      for (const fixture of fixtures) {
         fixture.rg = rg.getRoutegadgetData(fixture.area, fixture.club);
      }
   }

   async addEntryDetails(fixtures: Fixture[]) {
      const entry = new Entries();
      await entry.addEntries(fixtures);
   }

   private async saveFile(filename: string, fileData: Fixture[]) {

      const bucket = this.storage.bucket();

      try {
         const file = bucket.file(filename);
         const json = JSON.stringify(fileData);

         const options = {
            gzip: true,
            contentType: "application/json",
            metadata: { cacheControl: "public, max-age=300, stale-while-revalidate=86400" }
         };

         await file.save(json, options);
      } catch (e) {
         console.error(`Fixtures: Error saving ${filename} to cloud storage: ` + e);
         throw e;
      }
   };


   /** Save fixtures JSON file to Google Storage */
   private async saveToStorage(fixtures: Fixture[]): Promise<void> {

      await this.saveFile("fixtures/uk", fixtures);
      
      const recent = fixtures.slice(0, NUM_RECENT_FIXTURES);
      await this.saveFile("fixtures/uk-recent", recent);
   }

   public async loadBOFPDA(): Promise<string> {
      let response: string;
      try {
         response = await request(this.BOFPDAURL, { method: "get" });
      } catch (e) {
         console.error("Fixtures: Error making HTTP request: " + e);
         throw e;
      }
      return response;
   }

   locCount = (fixtures: Fixture[], src: LocationSource) => fixtures.filter(f => f.locSource === src).length;

   private writeLogSummary(fixtures: Fixture[]) {

      console.log('-------------------------------------------');
      console.log('Fixtures Summary');

      this.logLine('Total fixtures', fixtures.length, 800);

      this.logLine('Position from gridref', this.locCount(fixtures, 'gridref'), 150);
      this.logLine('Position from postcode', this.locCount(fixtures, 'postcode'), 150);
      this.logLine('Position from google', this.locCount(fixtures, 'google'), 30);
      this.logLine('Position from google cache', this.locCount(fixtures, 'googleCache'), 300);
      this.logLine('Position from club', this.locCount(fixtures, 'club'), 1);
      this.logLine('Position from not known', this.locCount(fixtures, ''), 0);

      this.logLine('Fixtures with Routegagdget data', fixtures.filter(f => f.rg).length, 500);

      this.logLine('Fixtures with OTools data', fixtures.filter(f => f.otoolsId).length, 40);

      this.logLine('Fixtures that can be entered', fixtures.filter(f => f.entryURL).length, 30);

      this.logLine('Racesignup entries', fixtures.filter(f => f.entryURL?.includes('racesignup')).length, 10);
      this.logLine('Fabian entries', fixtures.filter(f => f.entryURL?.includes('fabian4')).length, 10);
      this.logLine('SI enries entries', fixtures.filter(f => f.entryURL?.includes('sientries')).length, 10);

      console.log('-------------------------------------------');

   }

   logLine(title: string, value: number, threshold: number) {
      if (value < threshold) {
         console.warn(`Maintenance task metrics warning ${title}: ${value.toString()} - Threshold: ${threshold.toString()}` );
      }
      console.log(title + ': ' + value.toString());
   }
}
