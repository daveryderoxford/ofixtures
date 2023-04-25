import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { getStorage } from 'firebase-admin/storage';
import { LatLong } from "../model/latlng";
import { Fixture } from "../model/fixture"; 

export interface ClubLocation {
   shortName: string;
   latLng: { lat: number; lng: number }
}

const groupBy = <T, K extends keyof any>( list: T[], getKey: ( item: T ) => K ) =>
   list.reduce( ( previous, currentItem ) => {
      const group = getKey( currentItem );
      if ( !previous[group] ) previous[group] = [];
      previous[group].push( currentItem );
      return previous;
   }, {} as Record<K, T[]> );


const CLUB_LOCATIONS_FILNAME = "fixtures/club_locations.json";

export async function loadClubLocations(): Promise<ClubLocation[]> {
   let response: any;
   try {
      const file = getStorage().bucket().file( CLUB_LOCATIONS_FILNAME );
      response = await file.download();

   } catch ( e ) {
      console.error( "Club Locations: Error reading club locations: " + e );
      throw e;
   }
   return JSON.parse( response as string );
}


// ========================== Club Location calculation =========================

/** Determine the location for a club based on the mean location for all current fixtures for the club
 * The event location is constained ot the in the UK and based on grid ref/postcode/google area search
 */
export const determineClubLocatons = functions.region( 'europe-west1' ).https.onRequest( async ( req, res ) => {
   const fixtures = await readFixtures();
   const locations = clubLocationFromFixtures( fixtures );
   await saveToStorage( locations );
} );

const UK_BOUNDING_BOX = { latmin: 48.500, longmin: -13.683, latmax: 64.067, longmax: 3.858 };

function fixInUK( fix: Fixture ): boolean {
   const loc = fix.latLong;
   return ( loc.lat > UK_BOUNDING_BOX.latmin && loc.lat < UK_BOUNDING_BOX.latmax &&
      loc.lng > UK_BOUNDING_BOX.longmin && loc.lng < UK_BOUNDING_BOX.longmax );
}

/** Calculate the club's location from the average of current fixtures */
export function clubLocationFromFixtures( fixtures: Fixture[] ): ClubLocation[] {

   const fixturesWithAccurateLocation = fixtures.filter( fix => fix.club !== "" && ( fix.locSource === 'gridref' || fix.locSource === 'postcode' || fix.locSource === 'google' ) && fixInUK( fix ) );

   const groupedByClub = groupBy( fixturesWithAccurateLocation, fix => fix.club );

   const output: ClubLocation[] = [];

   for ( const [name, clubFixtures] of Object.entries( groupedByClub ) ) {

      const sum = clubFixtures.reduce<LatLong>( ( acc, fix ) => {
         acc.lat = acc.lat + fix.latLong.lat;
         acc.lng = acc.lng + fix.latLong.lng;
         return acc
      }, { lat: 0, lng: 0 } );

      sum.lat = sum.lat / clubFixtures.length;
      sum.lng = sum.lng / clubFixtures.length;

      output.push( { shortName: name, latLng: sum } );
   }
   return output.sort( ( a, b ) => a.shortName.localeCompare( b.shortName ) );
}

/** Save fixtures JSON file to Google Storage */
async function saveToStorage( clubLocations: ClubLocation[] ): Promise<void> {
   const filename = "fixtures/clublocations";

   const storage = admin.storage();

   try {
      const file = storage.bucket().file( CLUB_LOCATIONS_FILNAME );
      // console.log( "Saving club location file.  Bucket: " + file.bucket.name + "   File name: " +  file.name);

      const data = JSON.stringify( clubLocations );
      // console.log( "Saving data file:" + data);

      const options = {
         gzip: true,
         contentType: "application/json",
         metadata: { cacheControl: "public, max-age=86400, no-transform" }
      };

      await file.save( data, options );

   } catch ( e ) {
      console.error( "Club Locations: Error saving fixtures to cloud storage: " + e );
      throw e;
   }
}

/** Read fixtures JSON file from Google Storage */
async function readFixtures(): Promise<Fixture[]> {
   const filename = "fixtures/uk";

   const storage = admin.storage();

   try {
      const file = storage.bucket().file( filename );

      const buffer = ( await file.download() );

      return JSON.parse( buffer.toString() );

   } catch ( e ) {
      console.error( "Fixtures: Error read fixtures from clould storage: " + e );
      throw e;
   }
}