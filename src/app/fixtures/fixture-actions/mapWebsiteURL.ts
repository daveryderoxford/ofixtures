/** Functions to for URLS for mapping websites  */
import { Fixture, LatLong } from '../@store/fixture';

function latLongStr(loc: LatLong, seperator = ","): string {
   return loc.lat.toString() + seperator + loc.lng.toString();
}

/** Google maps link with directions from home location */
export function getGoogleDirectionsURL(fixture: Fixture, homeLocation: LatLong): string {
   if (!homeLocation || !fixture?.latLong) {
      return "";
   }

   return "https://www.google.com/maps/dir/?api=1&origin=" + latLongStr(homeLocation)
      + "&destination= " + latLongStr(fixture.latLong);
}

export function getGoogleMapsURL(fix: Fixture): string {
   if (!fix?.latLong) {
      return "";
   }

   return "https://www.google.com/maps/search/?api=1&query=" +
      latLongStr(fix.latLong) + "&query_place_id=" + fix.area + "&zoom=11";
}

export function getOsMapURL(fix: Fixture): string {
   if (!fix?.latLong) {
      return "";
   }

   const lat = fix.latLong.lat.toString();
   const lng = fix.latLong.lng.toString();

   return `https://explore.osmaps.com/?lat=${lat}&lon=${lng}zoom=12`;
}

export function getBingURL(fix: Fixture): string {
   if (!fix?.latLong) {
      return "";
   }

   return 'https://www.bing.com/maps/?cp=' + latLongStr(fix.latLong, '~') + "&lvl=15&style=s&sp=" +
      latLongStr(fix.latLong, '_') + "_" + fix.area;
}

export function getSysmapsURL(fix: Fixture): string {
   if (!fix?.latLong) {
      return "";
   }

   const lat = fix.latLong.lat.toString();
   const lng = fix.latLong.lng.toString();

   return `https://www.sysmaps.co.uk/sysmaps_os.html?!${lat}~${lng}`;
}