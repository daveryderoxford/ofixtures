import { LatLng } from "@googlemaps/google-maps-services-js";
import { RGData } from "model/fixture.js";
import request from "request-promise";
import { RGSITES, RGSite } from "./routegadgetclubs.js";
import { getStorage } from 'firebase-admin/storage';

type RGFormat = 'a' | 'b';
type RGType = 'I' | 'N' | 'R' | 'L' | 'T';


export interface RGSiteEvents extends RGSite {
   events: RGEvent[];
}

interface RGEventRaw {
   id: string;
   mapid: string;
   format: RGFormat;
   name: string;
   date: string;
   club: string;
   type: RGType;
   comment: string;
   locked: boolean;
   courses: [];
   suffix: string;
   A: string;
   B: string;
   C: string;
   D: string;
   E: string;
   F: string;
}

interface RGEvent {
   id: string;
   name: string;
   club: string;
   date: string;
   mapid: number;
   mapfile: string;
   worldFile: Worldfile;
}

const skippedAreaWords = ['forest', 'wood', 'woods', 'common', 'heath', 'moor', 'moors', 'park', 'parks', 'valley', 'edge', 'country', 'hill', 'hills', 'down', 'burrows', 'warren', 'estate', 'slieve', 'bryn', 'beck', 'crag', 'chase', 'fell', 'rigg', 'craig', 'university', 'town', 'city',
   'school', 'club', 'camp', 'barracks', 'garrison', 'north', 'south', 'east', 'west', 'northeast', 'northwest', 'southeast', 'southwest', 'tbc', 'tba', 'and', 'the'];

export class Routegadget {
    CACHE_FILE_NAME = 'routegadget_events.json';
    CACHE_FILE_PATH = 'fixtures/routegadget_events.json';

   rgSitesMap = new Map<string, RGSiteEvents>();

   async initialise(sites?: RGSite[]) {
      this.rgSitesMap = await readRGEvents(sites);
   }

   /** Reads cached site data rather than routegadget site */
   async initialiseFromCache() {
      let response: any;
        try {
          const file = getStorage().bucket().file(this.CACHE_FILE_PATH );
          response = await file.download();
    
       } catch ( e ) {
          console.error( "Routegadget: Error reading file from cache: " + e );
          throw e;
       }
      this.rgSitesMap = new Map<string, RGSiteEvents>(JSON.parse(response));
   }

   /**
    *  Finds ficture area string in routegarget events for the club 
    * The fixture area will match a rg event name if either:
    *  1.  The complete area string in included in the event name OR
    *  2.  Any word in area string (excluding  common names and words shorter that 3 characters) is also occurs in the event name
    *  All comparisons are case insensitive. 
    */
   public getRoutegadgetData(area: string | undefined, club: string | undefined): RGData {

   const clubLower = club?.toLowerCase();
   const rgSite = this.rgSitesMap.get(clubLower);

   if (!rgSite) {
      return (null);
   }

   if (!area) {
      return { baseURL: rgSite.baseURL, maps: [] };
   }

   const areaWords = area.toLowerCase().trim().split(" ").filter(word => {
      return !skippedAreaWords.includes(word) && word.length > 2;
   });

   // console.log( "Routgadget area:  " + area + "  Words: " + areaWords.toString());

   const maps = rgSite.events.filter(event => {
      const name = event.name.toLowerCase();
      // the area is not empty string and either complete area string matches or filtered area worda occur in event name
      const ok = area !== "" &&
         (name.includes(area) ||
            areaWords.some(word => this.wordInString(name, word)));
      return ok;
   }).sort((a, b) => {
      // Sort to have matches complete area string first followed by sort by event id order.  
      const amatches = a.name.includes(area);
      const bmatches = b.name.includes(area);
      if (amatches === bmatches) {
         return parseInt(b.id) - parseInt(a.id);
      } else {
         return amatches ? 1 : -1;
      }
   }).map(event => {
      return { id: event.id, name: event.name, mapfile: event.mapfile };
   });

   // console.log( "Routgadget maps:  " + JSON.stringify(maps) );

   return { baseURL: rgSite.baseURL, maps: maps };
}

/** Returns if a word if found in a string */
wordInString(string: string, word): boolean {
   return new RegExp("\\b" + this.escapeRegExp(word) + "\\b").test(string);
}

escapeRegExp(s: string): string {
   return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

/** Finds a routegagdget map within 10km of specified location */
findRoutemadgetMapByLocation(latlong: LatLng): RGData[] {
   // TODO
   return [];
}


}

export class Worldfile {

   public valid: boolean;

   private xCorrection: number;
   private yCorrection: number;
   private AEDB: number;
   A: number;
   B: number;
   C: number;
   D: number;
   E: number;
   F: number;

   constructor(wf: { A: string; B: string; C: string; D: string; E: string; F: string; }) {

      if (wf.A === undefined) {
         this.valid = false;
         this.A = 0;
         this.B = 0;
         this.C = 0;
         this.D = 0;
         this.E = 0;
         this.F = 0;
      } else {
         this.A = parseFloat(wf.A);
         this.B = parseFloat(wf.B);
         this.C = parseFloat(wf.C);
         this.D = parseFloat(wf.D);
         this.E = parseFloat(wf.E);
         this.F = parseFloat(wf.F);
         this.valid = true;
         // helps make later calculations easier
         this.AEDB = (this.A * this.E) - (this.D * this.B);
         this.xCorrection = (this.B * this.F) - (this.E * this.C);
         this.yCorrection = (this.D * this.C) - (this.A * this.F);
      }
   }

   getX(lng: number, lat: number): number {
      return Math.round(((this.E * lng) - (this.B * lat) + this.xCorrection) / this.AEDB);
   }

   // use worldfile to generate y value
   getY(lng: number, lat: number): number {
      return Math.round(((-1 * this.D * lng) + (this.A * lat) + this.yCorrection) / this.AEDB);
   }

   // use worldfile to generate longitude
   getLon(x: number, y: number): number {
      return (this.A * x) + (this.B * y) + this.C;
   }

   // use worldfile to generate latitude
   getLat(x: number, y: number): number {
      return (this.D * x) + (this.E * y) + this.F;
   }

};

async function readRGEvents(sites?: RGSite[]): Promise<Map<string, RGSiteEvents>> {

   sites = sites ?? RGSITES;
   const rgSitesMap = new Map<string, RGSiteEvents>();

   for (const site of sites) {
      const events = await readSiteEvents(site);
      rgSitesMap.set(site.shortName.toLowerCase(), { ...site, events: events });
   }

   return rgSitesMap;
}

async function readSiteEvents(site: RGSite): Promise<RGEvent[]> {

   const url = site.baseURL + "rg2/rg2api.php?type=events";

   let rawEvents: RGEventRaw[] = [];

   try {
      const jsonStr = await request(url, { method: "get" });
      const json = JSON.parse(jsonStr);

      rawEvents = json?.data?.events;

      console.log("Routgadget: Club: " + site.shortName + " Number of events:" + rawEvents.length);
   } catch (e) {
      console.error("Routgadget: Error encountered reading routegadget events for " + site.shortName + "   (" + url + ")\n");
      console.error(e.toString().slice(0, 200));
      rawEvents = [];
   }

   return rawEvents.map(raw => createEvent(raw));
}

function createEvent(raw: RGEventRaw): RGEvent {
   return {
      id: raw.id,
      name: raw.name,
      club: raw.club,
      date: raw.date,
      mapid: parseInt(raw.mapid),
      mapfile: raw.mapid + '.' + (raw.suffix ?? 'jpg'),
      worldFile: new Worldfile(raw),
   };

}
