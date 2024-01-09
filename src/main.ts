
import { enableProdMode, ErrorHandler, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'environments/environment';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { connectStorageEmulator } from 'firebase/storage';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { firebaseConfig } from './app/app.firebase-config';
import { GlobalErrorHandler } from './app/errorHandler';
import { FixturesModule } from './app/fixtures/fixtures.module';
import { LeagueModule } from './app/league/league.module';
import { SharedModule } from './app/shared/shared.module';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      ReactiveFormsModule,
      ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
      AppRoutingModule,
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
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
      provideStorage(() => {
        const storage = getStorage();
        if (environment.useEmulator) {
          console.log('Storage emulator configured');
          connectStorageEmulator(storage, 'http://localhost', 9199);
        }
        return storage;
      }),
      provideAnalytics(() => getAnalytics()),
      SharedModule,
      FixturesModule,
      LeagueModule
    ),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    ScreenTrackingService,
    UserTrackingService,
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(MatDialogModule, MatSnackBarModule),
  ]
});
