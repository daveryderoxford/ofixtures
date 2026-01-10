import { getStorage } from 'firebase-admin/storage';
import { onSchedule } from "firebase-functions/v2/scheduler";
import { Fixtures } from "./fixtures/fixtures.js";

/** Run to perfrom maintenance tasks once/day at 16:00 */
export const maintenance = onSchedule( { schedule: 'every day 16:00', timeZone: 'GB', timeoutSeconds: 150 }, async ( event ) => {

   console.log( "Maintenance task starting");

   try {
      await new Fixtures(getStorage()).processFixtures();
   } catch ( e ) {
      console.error( "Maintainance task error:  " + e.toString() );
   }
});