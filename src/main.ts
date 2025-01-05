
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { environment } from 'environments/environment';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { connectStorageEmulator } from 'firebase/storage';
import { AppComponent } from './app/app.component';
import { firebaseConfig } from './app/app.firebase-config';

import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { APP_ROUTES } from 'app/app.routes';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
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
        // { provide: ErrorHandler, useClass: GlobalErrorHandler },
        ScreenTrackingService,
        UserTrackingService,

        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        importProvidersFrom(
            MatDialogModule,
            MatSnackBarModule,
        ),
        provideRouter(APP_ROUTES,
            withPreloading(PreloadAllModules),
            //    withDebugTracing(),
        ),
    ]
});
