import { onCall } from "firebase-functions/v2/https";
import { getAuth } from 'firebase-admin/auth';

const SUPER_USER = "l8Rex76EDGTME2i44gbpcF7EKOH2";

async function grantModeratorRole( email: string ) {
   const user = await getAuth().getUserByEmail( email );
   await getAuth().setCustomUserClaims( user.uid, { admin: true } );
}

export const grantAdmin = onCall( async ( request ) => {

   // Only alllow super user or admin user
   if ( request.auth?.token.admin === true || request.auth?.uid === SUPER_USER ) {
      await grantModeratorRole( request.data.email );
      return { result: "Request fulfilled! ${email} is now a moderator." };

   } else {
      return { error: "Request not authorized. User must be a super user or admin to give user admin permissions." };
   }
});
