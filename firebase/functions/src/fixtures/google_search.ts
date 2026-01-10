/*  Uses Googe geoocation API to convert ;pcations to
*/
import { Client, Status } from "@googlemaps/google-maps-services-js";
import { defineString } from "firebase-functions/params";
import { LatLong } from "../model/latlng.js";
import { getDistanceFromLatLngInKm } from "./geo_conversion.js";

const googleMapsApiKey = defineString("GOOGLE_MAPS_API_KEY");

export const googleLocationService = new Client({});

const MIN_FROM_TRAGET_KM = 80;

/** Get get the geographic location of a place using Google Geoloation service.
 *  If a target location is specified, only locations within MIN_FROM_TRAGET are returned
 */
export async function googleLocationSearch(address: string, targetLocation: LatLong | null): Promise<LatLong | null> {

   let ret: LatLong;

   try {

      const response = await googleLocationService.geocode({
         params: {
            address: address,
            region: 'uk',
            key: googleMapsApiKey.value(),
         },
         timeout: 1000, // milliseconds
      });

      if (response.data.status === Status.OK) {
         if (targetLocation) {
            const locations = response.data.results.map(res => res.geometry.location);
            ret = locations.find(loc => getDistanceFromLatLngInKm(loc, targetLocation) < MIN_FROM_TRAGET_KM);
         } else {
            ret = response.data.results[0].geometry.location;
         }

      } else if (response.data.status === Status.ZERO_RESULTS || response.data.status === Status.NOT_FOUND) {
         //     console.log(
         //       `GoogleLocationSearch:  Address not found: ${address}  Status: ${response.data.status}  Message: ${response.data.error_message} ` );
         ret = null;
      } else {
         console.log(
            `GoogleLocationSearch: - Error in Geoconversion  Address: ${address}  Status: ${response.data.status}  Message: ${response.data.error_message} `);
         ret = null;
      }

   } catch (e) {
      console.log(`GoogleLocationSearch: Error in calling function.  Address: ${address}  Exception: ${e}`);
      ret = null;
   }

   return ret;

}
