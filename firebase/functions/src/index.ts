/**
 * OFixtures Google clould functions exports
 */
import "./firebase-config.js";
import { getApps, initializeApp } from "firebase-admin/app";  

// Ensure app is only initialise once 
// This is required to test functions using the emulator
if (getApps().length === 0) {
   const app = initializeApp();
   console.log(`Initialized Firebase app: ${app.name}`);
}

export { 
   grantAdmin 
} from "./admin/admin.js";

export { 
   changeEntry, 
   createEntry, 
   deleteEntry
} from "./entry/entry.js";

export { 
   createUser, 
   deleteUser 
} from "./user/user.js";

export { 
   clubLocations 
} from "./fixtures/club_locations.js";

export { 
   maintenance 
} from "./maintenance-task.js";
