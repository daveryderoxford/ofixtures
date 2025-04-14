import { Injectable, inject } from '@angular/core';
import { CollectionReference, collection, collectionData, deleteDoc, doc, query, setDoc, where } from '@angular/fire/firestore';
import { AuthService } from 'app/auth/auth.service';
import { AdditionalFixture } from 'app/model/fixture';
import { startOfDay, subDays } from 'date-fns';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FirestoreProvider } from '../../shared/services/firestore-provider';

@Injectable( {
  providedIn: 'root'
} )
export class AdditionalFixtureService {
  private fs = inject(FirestoreProvider).getFirestore();
  private auth = inject(AuthService);

  private readonly _selectedFixture = new BehaviorSubject<AdditionalFixture | null>( null );
  readonly selected$ = this._selectedFixture.asObservable();

  private _fixtures$!: Observable<AdditionalFixture[]>;

  /** Observable of fixtures for the current user 
   *  Lazily instanciated so quey is only executed if required.
  */
  public get fixtures$() {
    if ( !this._fixtures$ ) {
      const fixturesRef = collection(this.fs, "fixtures") as CollectionReference<AdditionalFixture>;
      const queryStart = startOfDay(subDays(new Date(), 1)).toISOString();
      const q = query( fixturesRef, 
        where( "userId", "==", this.auth.user()!.uid ),
        where( "date", ">", queryStart)
      );
      this._fixtures$ = collectionData( q ).pipe(
        map( fixtures => fixtures.sort( (a,b) => a.date.localeCompare(b.date))),
        shareReplay(1),
      );
    }
    return this._fixtures$; 
 }

  async update( id: string, fixture: Partial<AdditionalFixture> ): Promise<void> {
    const d = doc( this.fs, 'fixtures', id );
    await setDoc( d, fixture, { merge: true } );
  }

  async add( fixture: Partial<AdditionalFixture> ): Promise<void> {

    // Get document ref for new document
    const d = doc( collection( this.fs, "fixtures" ) );
    fixture.userId = this.auth.user()!.uid;
    fixture.id = d.id;

    await setDoc( d, fixture );

  }

  async delete( id: string ): Promise<void> {
    const d = doc( this.fs, 'fixtures', id );
    await deleteDoc( d );
  }

  setSelected( fixture: AdditionalFixture ) {
    if ( fixture ) {
      this._selectedFixture.next( { ...fixture } );
    } else {
      this._selectedFixture.next( null );
    }
  }
}
