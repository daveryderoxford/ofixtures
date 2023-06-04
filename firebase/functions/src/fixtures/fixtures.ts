import * as request from "request-promise";
import { Fixture, } from "../model/fixture";
import { LatLong } from "../model/latlng";
import { EventGrade } from "../model/oevent";
import { BOFPDParser } from "./bof_pda_parse";
import { GT_OSGB } from "./geo_conversion";
import { LatLong as LatLongPIO, PostCodeLookup } from "./postcode";
import { googleLocationSearch } from "./google_search";
import * as admin from "firebase-admin";
import { Routegadget } from "./routegadget";
import { ClubLocation, loadClubLocations } from "./club_locations";
import { readAdditionalFixtures } from "./additional_fixtures";

export class Fixtures {
   readonly BOFPDAURL =
      "https://www.britishorienteering.org.uk/event_diary_pda.php";

   lookup = new PostCodeLookup();

   clubs: ClubLocation[];

   version = "2.0.0";

   constructor ( private storage: admin.storage.Storage ) { }

   /** Read BOF PDA data from URL and parse it. */
   public async processFixtures() {

      console.log( "Fixtures version " + this.version );

      console.log( "Loading Club locations" );
      this.clubs = await this.loadClubLocations();

      console.log( "Processing BOF Fixtures");
      const bofFixtures = await this.processBOFFixtures();

      console.log( "Processing Additional fixtures" );
      const additionalFixtures = await this.processAdditonalFixtures();
      
      const fixtures = bofFixtures.concat( additionalFixtures );
      fixtures.sort( ( a, b ) => a.date.localeCompare( b.date ) );

      console.log( "Finding Routegadget maps" );
      await this.addRoutegadgetMaps( fixtures );

      console.log( "Saving fixture file" );
      await this.saveToStorage( fixtures );

      console.log( "Done" );

   }

   private async loadClubLocations(): Promise<ClubLocation[]> {
      return await loadClubLocations()
   }

   /** Make fixtures array for BOF fixturesd. */
   private async processBOFFixtures(): Promise<Fixture[]> {

      console.log( "Loading BOF PDA Data" );
      const text = await this.loadBOFPDA();

      console.log( "Parsing BOF PDA Data" );
      const parser = new BOFPDParser();
      const bofFixtures = parser.parseBOFPDAFile( text )

      //  Create fixture array
      const fixtures: Partial<Fixture>[] = bofFixtures.map( bof => {
         const fixture: Partial<Fixture> = {
            id: bof.id,
            date: bof.date,
            name: bof.name,
            club: bof.club,
            clubURL: bof.clubURL,
            area: bof.area,
            association: bof.region,
            nearestTown: bof.nearestTown,
            grade: this.mapGrade( bof.grade ),
            type: "Foot",
            discipline: "Unknown",
            webpage: bof.BOFLink,
            locSource: ''
         };

         return fixture;
      } );

      await this.calcPostCodes( fixtures, bofFixtures );
      await this.calcLatLongs( fixtures, bofFixtures );

      return fixtures as Fixture[];
   }

   private async processAdditonalFixtures(): Promise<Fixture[]> {

      console.log( "Reading additional fixtures" );
      const fixtures = await readAdditionalFixtures();

      const data = fixtures.map( f => {
         return {
            postcode: f.postcode,
            gridRefStr: f.gridRefString,
         }
      });
      await this.calcPostCodes( fixtures, data );

      const data2 = fixtures.map( f => {
         return {
            postcode: f.postcode,
            gridRefStr: f.gridRefString,
            area: f?.area,
            nearestTown: f?.nearestTown,
            club: f.club
         };
      });
      await this.calcLatLongs( fixtures, data2 );

      return fixtures;

   }

   /** Sets Fixture postcodes for bof data for all values, determining postcode from latlong where necessary */
   private async calcPostCodes( fixtures: Partial<Fixture>[], data: { postcode: string, gridRefStr: string }[] ) {
      console.log( "     Calculating postcodes" )
      const latlongsToCalc: LatLongPIO[] = [];
      const fixturesToCalc: Partial<Fixture>[] = [];

      // Set postcodes for ones avalible from BOF data and identify ones that need to be calculated using postcode.io
      for ( let i = 0; i < fixtures.length; i++ ) {
         if ( data[i].postcode !== "" ) {
            fixtures[i].postcode = data[i].postcode;
         } else if ( data[i].gridRefStr && data[i].gridRefStr !== "" ) {
            const loc = this.osgbToLatLong( data[i].gridRefStr );
            if ( loc ) {
               latlongsToCalc.push( loc );
               fixturesToCalc.push( fixtures[i] );
            }
         } else {
            fixtures[i].postcode = "";
         }
      }

      const postcodes = await this.lookup.latLongToPostcode( latlongsToCalc );

      for ( let i = 0; i < postcodes.length; i++ ) {
         fixturesToCalc[i].postcode = postcodes[i];
      }
   }

   /** Sets Fixture latlong for bof data for all values, calculating from postcode where necessary */
   private async calcLatLongs( fixtures: Partial<Fixture>[], data: { postcode: string, gridRefStr: string, area: string, nearestTown: string, club: string }[] ) {
      console.log( "     Calculating latlongs" )

      const postcodesToCalc: string[] = [];
      const fixtuersToCalc: Partial<Fixture>[] = [];

      // Set latlongs for ones avalible from BOF data and identify ones that need to be calculated using postcode.io or google geolocation.
      // Default value for club is used if no other exist
      for ( let i = 0; i < fixtures.length; i++ ) {
         const bof = data[i];
         const fix = fixtures[i];

         if ( bof.gridRefStr && bof.gridRefStr !== "" ) {
            fix.latLong = this.osgbToLatLong( bof.gridRefStr );
            if ( fix.latLong ) {
               fix.locSource = 'gridref';
            } else {
               // console.log( `Fixture: Unable to parse grid ref string. Fixture: ${fix.id} club ${fix.club} date: ${fix.date} Grid ref: ${bof.gridRefStr}` );
               fix.locSource = '';
            }
         } else if ( bof.postcode && bof.postcode !== "" ) {
            postcodesToCalc.push( bof.postcode );
            fixtuersToCalc.push( fix );
            fix.locSource = 'postcode';
         } else if ( bof.area || bof.nearestTown ) {
            fix.latLong = await googleLocationSearch( bof.area, bof.nearestTown, this.latLngForClub( bof.club ) );
            fix.locSource = fix.latLong ? 'google' : '';
         }
      }

      const locations = await this.lookup.postcodeToLocation( postcodesToCalc );

      for ( let i = 0; i < locations.length; i++ ) {
         fixtuersToCalc[i].latLong = locations[i];
      }

      // Set default latlong for club if we could not obtain from other sources
      fixtures.filter( fix => !fix.latLong ).forEach( fix => {
         fix.latLong = this.latLngForClub( fix.club );
         fix.locSource = fix.latLong ? 'club' : '';
      } );

   }

   private latLngForClub( clubname: string ): LatLong | null {
      const club = this.clubs.find( c => c.shortName === clubname );
      return club?.latLng;
   }

   private osgbToLatLong( gridRefStr: string ): LatLong {
      const osgb = new GT_OSGB();
      if ( osgb.parseGridRef( gridRefStr ) ) {
         const wgs84 = osgb.getWGS84();
         return { lat: wgs84.latitude, lng: wgs84.longitude };
      } else {
         return null;
      }
   }

   private mapGrade( bofGrade: string ): EventGrade {
      switch ( bofGrade ) {
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
            throw new Error( "Fixtures: Unexpected bof grade encountered: " + bofGrade );
      }
   }

   async addRoutegadgetMaps( fixtures: Fixture[] ) {
      const rg = new Routegadget();
      await rg.initialise();

      for ( const fixture of fixtures ) {
         fixture.rg = rg.getRoutegadgetData( fixture.area, fixture.club );
      }

   }

   /** Save fixtures JSON file to Google Storage */
   private async saveToStorage( fixtures: Fixture[] ): Promise<void> {
      const filename = "fixtures/uk";

      try {
         const file = this.storage.bucket().file( filename );
         // console.log( "Saving fixture file.  Bucket: " + file.bucket.name + "   File name: " +  file.name);

         const data = JSON.stringify( fixtures );
         // console.log( "Saving data file:" + data);

         const options = {
            gzip: true,
            contentType: "application/json",
            metadata: { cacheControl: "public, max-age=86400, no-transform" }
         };

         await file.save( data, options );

      } catch ( e ) {
         console.error( "Fixtures: Error saving fixtures to clould storage: " + e );
         throw e;
      }
   }

   private async loadBOFPDA(): Promise<string> {
      let response: string;
      try {
         response = await request( this.BOFPDAURL, { method: "get" } );
      } catch ( e ) {
         console.error( "Fixtures: Error making HTTP request: " + e );
         throw e;
      }
      return response;
   }
}
