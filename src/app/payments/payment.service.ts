
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore } from '@angular/fire/firestore';

@Injectable( {
  providedIn: 'root'
} )
export class PaymentService {

  userId: string;

  constructor ( private afs: Firestore, private afAuth: AngularFireAuth ) {
    this.afAuth.authState.subscribe( ( auth ) => {
      if ( auth )  {
        this.userId = auth.uid;
      }
    } );
  }

  async processPayment( token: any, amount: number ): Promise<void> {
    const payment = { token, amount };

    // this.afs.doc(''

  //  return this.db.list( `/payments/${this.userId}` ).push( payment )
  }

}
