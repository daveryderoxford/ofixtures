import * as admin from "firebase-admin";
import { LatLong } from "model/latlng";

const CACHE_COLLECTION = 'location_search_cache';

interface AddressLocationLookup {
   address: string;
   club: string;
   latLong: LatLong;
}

/** Read additonal fixtures from Firestore database */
export async function findInGoogleSearchCache(address: string, club: string): Promise<LatLong | null> {

   const collecton = admin.firestore().collection(CACHE_COLLECTION)
      .where("address", "==", address)
      .where("club", "==", club);

   const result = await collecton.get();
   const found = result.docs.map(doc => doc.data() as AddressLocationLookup);

   if (found.length === 1) {
      //  console.log(`findInGoogleSearchCache: Found location for ${address} and club ${club}.`);
      return found[0].latLong;
   } else if (found.length > 1) {
      console.log(`findInGoogleSearchCache: Found multiple results for ${address} and club ${club}. Returning first`);
      return found[0].latLong;
   } else {
      //  console.log(`findInGoogleSearchCache: Cached data not found for ${address} and club ${club}.`);
      return null;
   };
}

export async function saveInGoogleSearchCache(address: string, club: string, latLong: LatLong): Promise<void> {

   const doc = admin.firestore().collection(CACHE_COLLECTION).doc();
   try {
      await doc.set({
         address: address,
         club: club,
         latLong: latLong
      });
   } catch (e) {
      console.log(`findInGoogleSearchCache: Error saving  location to cache: Address: ${address} Club: ${club}.  Exception: ${e}`);
   }
}