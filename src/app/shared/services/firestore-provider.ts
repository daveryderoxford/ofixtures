import { inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { connectFirestoreEmulator, Firestore, getFirestore } from '@angular/fire/firestore';
import { environment } from 'environments/environment';

let firestore: any;

/** Get Firestore sychrsanoudsly.  */
@Injectable({
   providedIn: 'root'
})
export class FirestoreProvider {

   constructor() {

      firestore = getFirestore(inject(FirebaseApp));
      if (environment.useEmulator) {
         console.log('Firestore emulator configured');
         connectFirestoreEmulator(firestore, 'http://localhost', 8080);
      }
   }

   getFirestore(): Firestore {
      return firestore;
   }

}