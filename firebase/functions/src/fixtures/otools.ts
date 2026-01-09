import { Fixture } from 'model/fixture.js';
import request from "request-promise";

interface OToolsEvent {
   _id: string;
   bofId: null | number;
   entrySystemKey: null | { system: string, eventId: string; };
}

const OTOOLS_EVENTS_URL = 'https://www.otools.uk/api/v2/events';

export class OTools {

   /** Add OTools event Id to BOF fixtures 
    * Find any BOF fixtures present in both systems that have an entry system 
   */
   async addOToolsEventIds(fixtures: Fixture[]): Promise<Fixture[]> {

      const otoolsEvents = await this.readOToolsEvents();

      for (const fixture of fixtures) {
         const [prefix, id] = fixture.id.split('-');
         if (prefix === 'bof') {
            const found = otoolsEvents.find(ot => ot.bofId?.toString() === id);
            // Set otools id for fixtures where there is an entry system specified (so competitors can be found)
            if (found && found.entrySystemKey !== null) {
               fixture.otoolsId = found._id;
           //    console.log(`OTools: OFixtures event Id:  ${fixture.id}   OTools Id:  ${fixture.otoolsId}`);
            }
         }
      }
      return fixtures
   }

   async readOToolsEvents(): Promise<OToolsEvent[]> {

      let events = [];

      try {
         const jsonStr = await request(OTOOLS_EVENTS_URL, { method: "get" });
         const obj = JSON.parse(jsonStr);
         events = obj.events as OToolsEvent[];
      } catch (e) {
         console.error("OTools: Error encountered reading OTools events");
         console.error(e.toString().slice(0, 200));
         events = [];
      }

      return events;
   };
}
