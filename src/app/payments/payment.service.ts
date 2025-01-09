
import { Injectable, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from 'app/auth/auth.service';

@Injectable( {
  providedIn: 'root'
} )
export class PaymentService {
  private afs = inject(Firestore);
  private afAuth = inject(AuthService);


  async processPayment( token: any, amount: number ): Promise<void> {
    const payment = { token, amount };

    // this.afs.doc(''

  //  return this.db.list( `/payments/${this.userId}` ).push( payment )
  }

}
