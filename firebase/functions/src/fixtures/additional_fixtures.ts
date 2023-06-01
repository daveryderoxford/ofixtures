import * as admin from "firebase-admin";
import { Fixture } from "model/fixture";

/** Read additonal fixtures from Firestore database */
export async function readAdditionalFixtures(): Promise<Fixture[]> {
   const collecton =  admin.firestore().collection( 'fixtures' );
   const result = await collecton.get();
   return result.docs.map(
      doc => doc.data() as Fixture
   );
}
