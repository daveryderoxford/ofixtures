
import { Injectable, inject } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { FirestoreProvider } from 'app/shared/services/firestore-provider';

@Injectable( {
  providedIn: 'root'
} )
export class PaymentService {
  private fs = inject(FirestoreProvider).getFirestore();
  private afAuth = inject(AuthService);


  async processPayment( token: any, amount: number ): Promise<void> {
    const payment = { token, amount };

    // this.afs.doc(''

  //  return this.db.list( `/payments/${this.userId}` ).push( payment )
  }

}
