import { inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { connectFirestoreEmulator, Firestore, getFirestore } from '@angular/fire/firestore';
import { environment } from 'environments/environment';

@Injectable({
   providedIn: 'root'
})
export class FirestoreProvider {
   private readonly firestore: Firestore;

   constructor() {

      this.firestore = getFirestore(inject(FirebaseApp));
      if (environment.useEmulator) {
         console.log('Firestore emulator configured');
         connectFirestoreEmulator(this.firestore, 'http://localhost', 8080);
      }
   }

   getFirestore(): Firestore {
      return this.firestore;
   }

   /*
      async getFirestore(): Promise<any> {
      const fs =  await import('@angular/fire/firestore');
         const firestore = fs.getFirestore(inject(FirebaseApp));
         if (environment.useEmulator) {
            console.log('Firestore emulator configured');
            fs.connectFirestoreEmulator(firestore, 'http://localhost', 8080);
         }
      return firestore; */
}
