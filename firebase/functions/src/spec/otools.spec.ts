import { expect, spy } from 'chai';
import 'mocha';
import {OTools} from '../fixtures/otools';
import { fixtures } from './otools_fixtures';
import { on } from 'chai-spies';
import { otools_data_v2 } from './otools_data_v2';

describe('OTools', () => {

   it('should read OTools events from actual site', async () => {

      const otools = new OTools();

      const events = await otools.readOToolsEvents();

      expect(events.length).greaterThan(100);
      console.log('   OTools - Number of events: ' + events.length)

   }).timeout(50000);

   it('should read data correctly', async () => {

      const otools = new OTools();

      spy.on(otools, 'readOToolsEvents', () => Promise.resolve(otools_data_v2));

      const updated = await otools.addOToolsEventIds(fixtures);

    //  expect(updated[0].otoolsId).to.equal(undefined);
      expect(updated[1].otoolsId).to.equal("SI:12873"); //PFO SI entries ID 
      expect(updated[2].otoolsId).to.equal(undefined);  // BOF activity
      expect(updated[3].otoolsId).to.equal("SI:11938|1"); // JK Sprint

   }).timeout(200000);;

});
