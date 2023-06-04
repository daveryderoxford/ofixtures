import * as admin from "firebase-admin";
import { AdditionalFixture } from "model/fixture";

/** Read additonal fixtures from Firestore database */
export async function readAdditionalFixtures(): Promise<AdditionalFixture[]> {
   const collecton =  admin.firestore().collection( 'fixtures' );
   const result = await collecton.get();
   return result.docs.map(
      doc => doc.data() as AdditionalFixture
   );
}
