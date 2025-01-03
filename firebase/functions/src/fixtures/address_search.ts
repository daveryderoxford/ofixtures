import { LatLong } from 'model/latlng';
import { googleLocationSearch } from './google_search';
import { findInGoogleSearchCache, saveInGoogleSearchCache } from './google_search_cache';

export type AddressSearchSource = '' | 'googleCache' | 'google';

function makeAddress(area: string, town: string): string {

   /* Filter out known invalid areas/towns */
   const invalidLocations = ["TBC", "TBA", "VARIOUS", "ON-LINE", "ONLINE", "SOMEWHERE"];
   if (!area || invalidLocations.includes(area.toUpperCase().trim())) {
      area = "";
   }

   if (!town || invalidLocations.includes(town.toUpperCase().trim())) {
      town = "";
   }

   if (area && town) {
      return area + ", " + town;
   } else {
      return area + town;
   }
}

export async function findAddressLocation(
   area: string | null, town: string | null,
   club: string, targetLocation: LatLong | null
): Promise<{ source: AddressSearchSource, location: LatLong | null}> {

   let ret: LatLong;
   let source: AddressSearchSource = '';

   const address = makeAddress(area, town);

   if (address) {
      ret = await findInGoogleSearchCache(address, club);
      source = ret ? 'googleCache' : '';
      if (!ret) {
         ret = await googleLocationSearch(address, targetLocation);
         source = ret ? 'google' : '';
         if (ret) {
            await saveInGoogleSearchCache(address, club, ret);
         }
      }
   } else {
      //     console.log( `findAddressLocation: No address specified.  Area: ${area}   Town:  ${town}` );
      ret = null;
   }
   return {
      source: source, 
      location:  ret
   };
}
