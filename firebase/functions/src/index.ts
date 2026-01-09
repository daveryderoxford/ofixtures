/**
 * OFixtures Google clould functions exports
 */
import * as admin from "firebase-admin";
import * as functions from 'firebase-functions/v1';
import * as sysAdmin from "./admin/admin.js";
import * as entry from "./entry/entry.js";
import { Fixtures } from "./fixtures/fixtures.js";
import * as user from "./user/user.js";
import * as clubs from "./fixtures/club_locations.js";

const firebaseAdmin = admin.initializeApp();

/** Run to perfrom maintenance tasks once/day at 16:00 */
export const maintenance = functions.region( 'europe-west1' ).pubsub.schedule( 'every day 16:00' ).timeZone( 'GB' ).onRun( async ( context ) => {

   console.log( "Maintenance task starting");

   try {
      await new Fixtures(firebaseAdmin.storage()).processFixtures();
   } catch ( e ) {
      console.error( "Maintainance task error:  " + e.toString() );
   }
});

export const grantAdmin = sysAdmin.grantAdmin;

export const createEntry = entry.createEntry;
export const deleteEntry = entry.deleteEntry;
export const changeEntry = entry.changeClass;

export const createUsder = user.createUser;
export const deleteUsder = user.deleteUser;

export const clubLocations = clubs.determineClubLocatons;
