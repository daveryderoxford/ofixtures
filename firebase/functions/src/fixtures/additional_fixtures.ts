import { startOfDay, subDays } from 'date-fns';
import * as admin from "firebase-admin";
import { AdditionalFixture } from "model/fixture";

/** Read additonal fixtures from Firestore database */
export async function readAdditionalFixtures(): Promise<AdditionalFixture[]> {

   const queryStart = startOfDay(subDays(new Date(), 1)).toISOString();
   const collecton = admin.firestore().collection('fixtures').where("date", ">", queryStart);
   
   const result = await collecton.get();
   return result.docs.map(
      doc => doc.data() as AdditionalFixture
   );
}
