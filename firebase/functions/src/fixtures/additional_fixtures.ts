import { startOfDay, subDays } from 'date-fns';
import { getFirestore } from 'firebase-admin/firestore';
import { AdditionalFixture } from "model/fixture.js";

/** Read additonal fixtures from Firestore database */
export async function readAdditionalFixtures(): Promise<AdditionalFixture[]> {

   const queryStart = startOfDay(subDays(new Date(), 1)).toISOString();
   const collecton = getFirestore().collection('fixtures').where("date", ">", queryStart);
   
   const result = await collecton.get();
   return result.docs.map(
      doc => doc.data() as AdditionalFixture
   );
}
