import { Fixture } from 'model/fixture';
import * as request from "request-promise";

interface OToolsEvent {
   id: string;
   system: string;
   bofFixture: {
      id: number;
   };
}

const OTOOLS_EVENTS_URL = 'https://www.otools.uk/api/events';

export class OTools {

   /** Add OTools event Id to BOF fixtures */
   async addOToolsEventIds(fixtures: Fixture[]): Promise<Fixture[]> {

      const otools = await this.readOToolsEvents();

      return fixtures.map(fixture => {
         const [prefix, id] = fixture.id.split('-');
         if (prefix === 'bof') {
            const found = otools.find(ot => ot.bofFixture?.id.toString() === id);
            if (found) {
               fixture.otoolsId = found.system + ':' + found.id;
               console.log(`OTools: OFixtures event Id:  ${fixture.id}   OTools Id:  ${fixture.otoolsId}`);

            }
         }
         return fixture;
      });
   }

   async readOToolsEvents(): Promise<OToolsEvent[]> {

      let events = [];

      try {
         const jsonStr = await request(OTOOLS_EVENTS_URL, { method: "get" });
         const json = JSON.parse(jsonStr);
         events = json as OToolsEvent[];
      } catch (e) {
         console.error("OTools: Error encountered reading OTools events");
         console.error(e.toString().slice(0, 200));
         events = [];
      }

      return events;
   };
}
