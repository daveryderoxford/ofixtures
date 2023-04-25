import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CollectionReference, DocumentReference, Firestore, Query, addDoc, collection, collectionData, 
         collectionGroup, deleteDoc, doc, docData, orderBy, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Fixture } from 'app/model';
import { Entry, FixtureDetailsAndEntries, FixtureEntryDetails } from 'app/model/entry';
import { Observable, forkJoin, of } from 'rxjs';
import { map, shareReplay, startWith, switchMap, take, tap } from 'rxjs/operators';

@Injectable( {
   providedIn: 'root'
} )
export class EntryService {

   fixtureEntryDetails$: Observable<FixtureEntryDetails[]>;
   userEntries$: Observable<Entry[]>;

   user: any = null;

   constructor ( private auth: AngularFireAuth,
      private fs: Firestore ) {

      auth.user.subscribe( user => this.user = user );

      this.userEntries$ = auth.user.pipe(
         switchMap( ( user ) => {
            if ( user ) {
               const q = query( collectionGroup( fs, "entries" ), where( 'userId', '==', user.uid ), orderBy( 'fixtureDate' ) ) as Query<Entry>;

               return collectionData( q );
            } else {
               return of( [] );
            }
         } ),
         tap( u => console.log( 'User entries' + JSON.stringify( u ) ) ),
         shareReplay( 1 ),
         startWith( [] )
      );

      /** All fixtures that may be entered */
      const q = query( collection( fs, "fixture_entry_details" ) ) as Query<FixtureEntryDetails>;;
      this.fixtureEntryDetails$ = collectionData( q ).pipe(
         shareReplay( 1 ),
         startWith( [] )
      );

   }

   /** Create new ebtFixtureEntryDetails object with defaults */
   createNewEntryDetails( id: string, fixture: Fixture ): FixtureEntryDetails {
      const details: Partial<FixtureEntryDetails> = {
         name: "",
         date: "",
         club: "",
         fixtureId: id,
         type: 'MapReservation',
         closingDate: new Date().toISOString(),
         hasAgeClasses: false,
         courses: [],
         userId: this.user.uid,
         createdAt: new Date().toISOString(),
         latestEntry: 0,
      };
      if ( fixture ) {
         details.name = fixture.name;
         details.date = fixture.date;
         details.club = fixture.club;
      }
      return details as FixtureEntryDetails;
   }

   async saveNewEntryDetails( fixtureEntryDetails: FixtureEntryDetails ): Promise<void> {
      const d = doc( this.fs, "entry/" + fixtureEntryDetails.fixtureId );
      await setDoc( d, fixtureEntryDetails );
   }

   getEntries(): Observable<FixtureEntryDetails[]> {
      const c = collection( this.fs, "entry" ) as CollectionReference<FixtureEntryDetails>;
      return collectionData( c );
   }

   /** Gets an observable for an existing entry */
   getEntryDetails( id: string ): Observable<FixtureEntryDetails> {
      const d = doc( this.fs, "entry/" + id ) as DocumentReference<FixtureEntryDetails>;
      return docData( d )
   }

   async updateEntryDetails( id: string, fixtureEntryDetails: Partial<FixtureEntryDetails> ): Promise<void> {
      try {
         const d = doc( this.fs, "entry/" + id );
         await updateDoc( d, fixtureEntryDetails );
      } catch ( err ) {
         console.log( "EntryService: Error updating map reservation" );
         throw ( err );
      }
   }

   /** Delete a map reservation -  the collection of competitorentries will be deleted by a cloud function */
   async removeEntryDetails( fixtureEntryDetails: FixtureEntryDetails ): Promise<void> {
      try {
         const d = doc( this.fs, "entry/" + fixtureEntryDetails.fixtureId );
         await deleteDoc( d );
      } catch ( err ) {
         console.log( "EntryService: Error deleting map reservation" );
         throw ( err );
      }
   }

   /** Enter or reserve a map for an event */
   async enter( fixture: FixtureEntryDetails, entry: Partial<Entry> ): Promise<void> {

      if ( !this.user ) {
         throw new Error( "Must be logged on to add map reservation" );
      }

      const user = await this.auth.currentUser;
      entry.userId = user.uid;
      entry.madeAt = new Date().toISOString();
      entry.fixtureId = fixture.fixtureId;
      entry.fixtureDate = fixture.date;

      await addDoc( this._entriesCollection( fixture.fixtureId ), entry )

      return;
   }

   getEntry$( fixtureId: string, id: string ): Observable<Entry> {
      return docData( this._entryDoc( fixtureId , id) );
   }

   /** Update entry details */
   async updateEntry( fixtureId: string, id: string, update: Partial<Entry> ): Promise<void> {
      return updateDoc( this._entryDoc( fixtureId, id ), update );
   }

   /** Delete an entry */
   async deleteEntry( fixtureId: string, id: string ) {
      return deleteDoc( this._entryDoc( fixtureId, id ) )
   }

   /** Returns observable of entries for an event. These are stored in a single array object in child colledtion of the event
    */
   getEntries$( fixtureId: string ): Observable<FixtureDetailsAndEntries> {

      const details$ = this.getEntryDetails( fixtureId ).pipe( take( 1 ) );
      const entries$ = collectionData( this._entriesCollection( fixtureId ) ).pipe( take( 1 ) );

      return forkJoin( [details$, entries$] ).pipe(
         map( ( [d, e] ) => {
            return { details: d, entries: e };
         } )
      );
   }

   private _entriesCollection( fixtureId: string ): CollectionReference<Entry> {
      return collection( this.fs, `entry/${fixtureId}/entries` ) as CollectionReference<Entry>;
   }

   private _entryDoc( fixtureId: string, id: string ): DocumentReference<Entry> {
      return doc( this.fs, `entry/${fixtureId}/entries/${id}` ) as DocumentReference<Entry>
   }
}
