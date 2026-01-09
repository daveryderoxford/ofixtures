import { describe, it, expect, vi } from 'vitest';
import { OTools } from '../fixtures/otools.js';
import { otools_data_v2 } from './otools_data_v2.js';
import { fixtures } from './otools_fixtures.js';

describe('OTools', () => {

   it('should read OTools events from actual site', async () => {

      const otools = new OTools();

      const events = await otools.readOToolsEvents();

      expect(events.length).toBeGreaterThan(100);
      console.log('   OTools - Number of events: ' + events.length)

   }, 50000);

   it('should read data correctly', async () => {

      const otools = new OTools();

      vi.spyOn(otools, 'readOToolsEvents').mockResolvedValue(otools_data_v2.events as any);

      const updated = await otools.addOToolsEventIds(fixtures);

    //  expect(updated[0].otoolsId).to.equal(undefined);
      expect(updated[1].otoolsId).toBe("6684f721003f54b8951dbff9"); //PFO SI entries ID 
      expect(updated[2].otoolsId).toBeUndefined();  // BOF activity
      expect(updated[3].otoolsId).toBe("666d092e574a082a1613e3de"); // JK Sprint

   }, 200000);;

});
