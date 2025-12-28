import { inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import type { Firestore } from '@angular/fire/firestore';
import { environment } from 'environments/environment';

export let fsModule: typeof import("@angular/fire/firestore") | undefined = undefined;

/** Gets Firestore instance asycnranously - dynamically importing module  */
@Injectable({
   providedIn: 'root'
})
export class FirestoreProviderAsync {
   private app = inject(FirebaseApp);

   /** Lazly provide Firestore  */
   async getFirestore(): Promise<Firestore> {
      fsModule = await import('@angular/fire/firestore');
      const firestore = fsModule.getFirestore(this.app);
      if (environment.useEmulator) {
         console.log('Firestore emulator configured');
         fsModule.connectFirestoreEmulator(firestore, 'http://localhost', 8080);
      }
      return firestore;
   }
}
