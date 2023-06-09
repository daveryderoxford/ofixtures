import { HttpClientModule } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { getStorage, provideStorage } from "@angular/fire/storage";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'environments/environment';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { firebaseConfig } from "./app.firebase-config";
import { GlobalErrorHandler } from './errorHandler';
import { FixturesModule } from './fixtures/fixtures.module';
import { SharedModule } from "./shared/shared.module";
import { LeagueModule } from "./league/league.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register( '/ngsw-worker.js', { enabled: environment.production } ),
    AppRoutingModule,
    provideFirebaseApp( () => initializeApp( firebaseConfig ) ), 
    provideAuth( () => getAuth() ),
    provideFirestore( () => getFirestore() ),
    provideStorage( () => getStorage() ), 
    SharedModule,
    HttpClientModule,
    FixturesModule,
    LeagueModule, 
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }]
})
export class AppModule { }
