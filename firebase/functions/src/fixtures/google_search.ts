/*  Uses Googe geoocation API to convert ;pcations to
*/
import { Client, Status } from "@googlemaps/google-maps-services-js";
import { getDistanceFromLatLngInKm } from "./geo_conversion";

interface LatLong {
   lat: number;
   lng: number;
}

export const googleLocationService = new Client( {} );

const MIN_FROM_TRAGET_KM = 80;

function makeAddress( area: string, town: string ): string {

   /* Filter out known invalid areas/towns */
   const invalidLocations = ["TBC", "TBA", "VARIOUS", "ON-LINE", "ONLINE", "SOMEWHERE"];
   if ( !area || invalidLocations.includes( area.toUpperCase().trim() ) ) {
      area = "";
   }

   if ( !town || invalidLocations.includes( town.toUpperCase().trim() ) ) {
      town = "";
   }

   if ( area && town ) {
      return area + ", " + town;
   } else {
      return area + town;
   }
}

/** Get the geographic location of a place using Google Geoloation service.
 *  If a target location is specified, only locations within MIN_FROM_TRAGET are returned
 */
export async function googleLocationSearch( area: string | null, town: string | null, targetLocation: LatLong | null ): Promise<LatLong | null> {

   let ret: LatLong;

   const address = makeAddress( area, town );

   if ( address ) {

      try {
         const response = await googleLocationService.geocode( {
            params: {
               address: address,
               region: 'uk',
               key: process.env.GOOGLE_MAPS_API_KEY,
            },
            timeout: 1000, // milliseconds
         } );

         if ( response.data.status === Status.OK ) {
            if ( targetLocation ) {
               const locations = response.data.results.map( res => res.geometry.location );
               ret = locations.find( loc => getDistanceFromLatLngInKm( loc, targetLocation ) < MIN_FROM_TRAGET_KM );
            } else {
               ret = response.data.results[0].geometry.location;
            }

         } else if ( response.data.status === Status.ZERO_RESULTS || response.data.status === Status.NOT_FOUND ) {
            //     console.log(
            //       `GeoConversion:  Address not found: ${address}  Status: ${response.data.status}  Message: ${response.data.error_message} ` );
            ret = null;
         } else {
            console.log(
               `GeoConversion: - Error in Geoconversion  Address: ${address}  Status: ${response.data.status}  Message: ${response.data.error_message} ` );
            ret = null;
         }

      } catch ( e ) {
         console.log( `GeoConversion: Error in calling function.  Area: ${area}   Town:  ${town}   Address: ${address}  Exception: ${e}` );
         ret = null;
      }
   } else {
      //     console.log( `GeoConversion: No address specified.  Area: ${area}   Town:  ${town}` );
      ret = null;
   }

   return ret;

}
