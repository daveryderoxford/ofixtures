import * as request from "request-promise";
import { Fixture, LatLong } from "model/fixture";

export interface ClubLocation {
   shortName: string;
   latLng: { lat: number; lng: number }
}

interface ClubLocationInternal extends ClubLocation {
   shortName: string;
   latLng: { lat: number; lng: number }
   latestBOFID: string;
   latestBOFActivityId: string;
}

const groupBy = <T, K extends keyof any>( list: T[], getKey: ( item: T ) => K ) =>
   list.reduce( ( previous, currentItem ) => {
      const group = getKey( currentItem );
      if ( !previous[group] ) previous[group] = [];
      previous[group].push( currentItem );
      return previous;
   }, {} as Record<K, T[]> );

export function calcClubLocations( fixtures: Fixture[] ): ClubLocation[] {

   const wellKnownLocation = fixtures.filter( fix => fix.locSource === 'gridref' || fix.locSource === 'postcode' );

   const groupByClub = groupBy( wellKnownLocation, fix => fix.club );

   const output: ClubLocation[] = [];

   for ( const [name, clubFixtures] of Object.entries( groupByClub ) ) {

      const sum = clubFixtures.reduce<LatLong>( ( acc, fix ) => {
         acc.lat = acc.lat + fix.latLong.lat;
         acc.lng = acc.lng + fix.latLong.lng;
         return acc
      }, { lat: 0, lng: 0 } );

      sum.lat = sum.lat / clubFixtures.length;
      sum.lng = sum.lng / clubFixtures.length;

      output.push( { shortName: name, latLng: sum } );
   }
   return output.sort( ( a, b ) => a.shortName.localeCompare(b.shortName));
}


export function getClubLocations() {
}


const CLUB_LOCATIONS_FILNAME = "fixtures/clublocations";

/** Save fixtures JSON file to Google Storage */
async function saveToStorage( clubLocations: ClubLocation[] ): Promise<void> {
   const filename = "fixtures/clublocations";

   try {
      const file = this.storage.bucket().file( CLUB_LOCATIONS_FILNAME );
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
      console.error( "Club Locations: Error saving fixtures to clould storage: " + e );
      throw e;
   }
}

async function loadClubLocations(): Promise<ClubLocationInternal[]> {
   let response: string;
   try {
      response = await request( this.BOFPDAURL, { method: "get" } );
   } catch ( e ) {
      console.error( "Club Locations: Error making HTTP request: " + e );
      throw e;
   }
   return JSON.parse( response );
}

function getDistanceFromLatLngInKm( pos1: LatLong, pos2: LatLong ): number {
   const R = 6371; // Radius of the earth in km
   const dLat = this._deg2rad( pos2.lat - pos1.lat );
   const dLon = this._deg2rad( pos2.lng - pos1.lng );
   const a =
      Math.sin( dLat / 2 ) * Math.sin( dLat / 2 ) +
      Math.cos( this._deg2rad( pos1.lat ) ) * Math.cos( this._deg2rad( pos2.lat ) ) *
      Math.sin( dLon / 2 ) * Math.sin( dLon / 2 );
   const c = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1 - a ) );
   const d = R * c; // Distance in km
   return d;
}
