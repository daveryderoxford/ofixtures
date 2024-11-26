import { expect } from 'chai';
import 'mocha';
import { Routegadget } from '../fixtures/routegadget';
import * as admin from "firebase-admin";
import * as sysAdmin from "../admin/admin";

describe('Routegaedget file save', () => {

   it('should update the saved routegagdget file', async () => {

      const gr = new Routegadget();

      await gr.initialise();

      /*  console.log( "=== Clubs Map details ====" );
        for ( const [key, events] of gr.clubs ) {
           console.log( key + "  Event count: " + events.length );
        } */

      // Save RG data file in cliuld storage
      const firebaseAdmin = admin.initializeApp();

      const grantAdmin = sysAdmin.grantAdmin;

      saveToStorage(admin.storage(), JSON.stringify(gr.rgSitesMap));

   }).timeout(20000);

   async function saveToStorage(storage: admin.storage.Storage, json: string) {

      const file = storage.bucket().file('routegadget_events');
      console.log("Saving fixture file.  Bucket: " + file.bucket.name + "   File name: " + file.name);

      // console.log( "Saving data file:" + data);

      const options = {
         contentType: "application/json",
         metadata: { cacheControl: "public, max-age=86400, no-transform" }
      };
      try {

         await file.save(json, options);

      } catch (e) {
         console.error("Fixtures: Error saving fixtures to clould storage: " + e);
         throw e;
      }
   }
});
