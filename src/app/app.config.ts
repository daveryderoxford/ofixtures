import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { firebaseConfig } from './app.firebase-config';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'environments/environment';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { provideStorage, getStorage, connectStorageEmulator } from '@angular/fire/storage';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideRouter, withPreloading, PreloadAllModules, withComponentInputBinding } from '@angular/router';
import { APP_ROUTES } from './app.routes';

   export const appConfig = { providers: [
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => {
         const auth = getAuth();
         if (environment.useEmulator) {
            console.log('Auth emulator configured');
            connectAuthEmulator(auth, 'http://localhost:9099');
         }
         return auth;
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
      // { provide: ErrorHandler, useClass: GlobalErrorHandler },
      ScreenTrackingService,
      UserTrackingService,

      provideHttpClient(withInterceptorsFromDi()),
      importProvidersFrom(
         MatDialogModule,
         MatSnackBarModule,
      ),
      provideRouter(APP_ROUTES,
         withPreloading(PreloadAllModules),
         withComponentInputBinding(),
      //   withDebugTracing(),
      ),
      { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
   ]
};