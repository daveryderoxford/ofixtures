import request from "request-promise";
import { Fixture } from "../model/fixture.js";

/** Reads BAOC fixtures from their website */

interface BAOCData {
   events: BAOCFixture[];
}

interface BAOCFixture {
   title: string;    //  "Mytchett (West)
   desc: string;     // "<b>Location:</b> <a href=\"https://w3w.co/rams.overnight.encounter\" target=\"_blank\">///rams.overnight.encounter</a> <br><b>Flyer:</b> Click <u><a href=\"https://img1.wsimg.com/blobby/go/10a56cdc-91fe-4964-bbcb-29d36b9fc4e1/downloads/9ecafc87-fdda-446e-bfd2-f33de2554690/MLS-Mytchett-West-15-Jan-2025.pdf?ver=1734435335505\" target=\"_blank\">here</a></u> for flyer <br><b>Entry:</b> Click <a href=\"https://racesignup.co.uk/\" target=\"_blank\">here</a> for entry link <br><b>Contact:</b> Maj (Retd) Colin Dickson BAOC",
   location: string; // "GU16 6DD, Mytchett, Camberley GU16 6DD, UK",
   start: string;    //  "2025-01-15T11:00:00+00:00",
   end: string;      // "2025-01-15T15:00:00+00:00",
   allDay: boolean;  // false;
}

const url = 'https://calendar.apps.secureserver.net/v1/events/10a56cdc-91fe-4964-bbcb-29d36b9fc4e1/a31a5bec-4386-4f9b-a5cc-caad58de15ce/b533fc98-2d52-4bd2-9cae-e0e75b89fd9c';

/** Loads and parses BAOC calander JSON */
export async function loadBAOCFixtures(): Promise<Fixture[]> {
   const str = await loadFile();
   return parsseBAOCFixtues(str);
}

/** Parses BAOC calander JSON */
export function parsseBAOCFixtues(str: string): Fixture[] {

   const bacoData = JSON.parse(str) as BAOCData;

   const fixtures: Partial<Fixture>[] = bacoData.events
      .filter(raw => raw.title.toUpperCase() !== 'TBC')
      .map((raw, index) => {

         const descData = parseDesc(raw.desc);
         const locationData = parseLocation(raw.location);

         const fixture: Partial<Fixture> = {
            id: 'BAOC-' + index,
            date: raw.start,
            name: raw.title,
            club: 'BAOC',
            clubURL: descData.eventURL,
            area: locationData.area,
            postcode: locationData.postcode,
            what3words: descData.what3words,
            association: 'SCOA',
            nearestTown: '',
            grade: "Regional",
            type: "Foot",
            discipline: "Long",
            webpage: descData.eventURL,
            locSource: ''
         };

         return fixture;
      });

   return fixtures as Fixture[];
}

async function loadFile(): Promise<string> {
   let response: string;
   try {
      response = await request(url, { method: "get" });
   } catch (e) {
      console.error("BAOC Fixtures: Error making HTTP request: " + e);
      throw e;
   }
   return response;
}

/** Parses BAOC calander JSON desc field */
function parseDesc(str: string): { eventURL: string; what3words: string; } {
   const ret = { eventURL: '', what3words: '' };

   const fields = str.split('<b>');

   console.log(fields);

   for (const field of fields) {
      if (field.includes('Location')) {
         const startIndex = field.indexOf("w3w.co/");
         const endIndex = field.indexOf('"', startIndex);
         if (startIndex !== -1 && endIndex !== -1) {
            ret.what3words = field.substring(startIndex + 7, endIndex);
         }
      }

      if (field.includes('Flyer')) {
         ret.eventURL = getUrl(field);
      }
   }

   return ret;
}

/** Parses BAOC calander JSON location field */
function parseLocation(str: string): { postcode: string; area: string; nearestTown: string; } {
   let ret = { postcode: '', area: '', nearestTown: '' };

   // All files exclusing 'UK'
   let words = str.trim().split(',').filter((text) => text.trim() !== 'UK');

   // Get postcode from field if it is avaliable
   const postcodeIndex = words.findIndex((text) => isPostCode(text));
   if (postcodeIndex !== -1) {
      ret.postcode = words[postcodeIndex].trim();
      words.splice(postcodeIndex, 1);
   }

   switch (words.length) {
      case 2:    // area, town
         ret.area = words[0].trim();
         ret.nearestTown = words[1].trim();
         break;
      case 1:
         splitArea(words[0], ret);

         break;
      default:  // other
         ret.area = str;
         break;
   }

   return ret;
}

/** Split location string into postcode and area  */
function splitArea(str: string, ret: { postcode: string; area: string; }) {

   const areaWords = str.split(' ').map(w => w.trim());
   if (areaWords.length === 3) {
      const pc = areaWords[1] + " " + areaWords[2];
      if (ret.postcode === '' && isPostCode(pc)) {
         ret.postcode = pc;
      }
      ret.area = areaWords[0];
   } else {
      ret.area = str.trim();
   }
}

function isPostCode(str: string): boolean {
   const text = str.trim().toUpperCase();

   if (text === "") {
      return false;
   }
   const regex = /^[A-Z]{1,2}([0-9]{1,2}|[0-9][A-Z])\s*[0-9][A-Z]{2}$/gi;
   const ret = regex.test(text);
   console.log('Postcode: ' + text + '  ' + ret.toString());
   return ret;
}

function getUrl(str: string): string {
   const startIndex = str.indexOf("href=");
   const test = str.substring(startIndex);
   const endIndex = str.indexOf('"', startIndex + 6);
   if (startIndex !== -1 && endIndex !== -1) {
      return str.substring(startIndex + 6, endIndex);
   }
   return '';
}
