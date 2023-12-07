
import { enableProdMode, ErrorHandler, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from 'environments/environment';
import { AppComponent } from './app/app.component';
import { LeagueModule } from './app/league/league.module';
import { FixturesModule } from './app/fixtures/fixtures.module';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { SharedModule } from './app/shared/shared.module';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { firebaseConfig } from './app/app.firebase-config';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { AppRoutingModule } from './app/app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { GlobalErrorHandler } from './app/errorHandler';
import { MatLegacyDialogModule as MatDialogModule}  from '@angular/material/legacy-dialog';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { connectStorageEmulator } from 'firebase/storage';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule,
      ReactiveFormsModule,
      ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
      AppRoutingModule,
      provideFirebaseApp( () => initializeApp(firebaseConfig)),
      provideAuth(() => {
        const auth = getAuth();
        if (environment.useEmulator) {
          console.log('Auth emulator configured');
          connectAuthEmulator(auth, 'http://localhost:9099');
        }
        return auth;
      }),
      provideFirestore(() => {
        const firestore = getFirestore();
        if (environment.useEmulator) {
          console.log('Firestore emulator configured');
          connectFirestoreEmulator(firestore, 'http://localhost', 8080);
        } 
        return firestore;
      }),
      provideStorage(() =>  {
        const storage = getStorage();
      if (environment.useEmulator) {
        console.log('Storage emulator configured');
        connectStorageEmulator(storage, 'http://localhost', 9199);
      } 
      return storage;
    }),
      SharedModule,
      FixturesModule,
      LeagueModule),
      { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(MatDialogModule, MatSnackBarModule),
  ]
});
