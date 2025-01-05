
import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

@Injectable( {
  providedIn: 'root'
} )
export class PaymentService {
  private afs = inject(Firestore);
  private afAuth = inject(AngularFireAuth);


  userId: string;

  constructor () {
    authState(this.afAuth).subscribe( ( auth ) => {
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
