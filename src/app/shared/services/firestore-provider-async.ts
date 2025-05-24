import { inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import type { Firestore } from '@angular/fire/firestore';
import { environment } from 'environments/environment';

/** Gets Firestore instance asycnranously - dynamically importing module  */
@Injectable({
   providedIn: 'root'
})
export class FirestoreProviderAsync {
   private app = inject(FirebaseApp);

   /** Lazly provide Firestore  */
   async getFirestore(): Promise<Firestore> {
      const fs = await import('@angular/fire/firestore');
      const firestore = fs.getFirestore(this.app);
      if (environment.useEmulator) {
         console.log('Firestore emulator configured');
         fs.connectFirestoreEmulator(firestore, 'http://localhost', 8080);
      }
      return firestore;
   }
}
