import { Injectable } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { CollectionReference, Firestore, collection, collectionData, deleteDoc, doc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { AdditionalFixture } from 'app/model/fixture';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable( {
  providedIn: 'root'
} )
export class AdditionalFixtureService {

  private readonly _selectedFixture = new BehaviorSubject<AdditionalFixture | null>( null );
  readonly selected$ = this._selectedFixture.asObservable();

  private _fixtures$: Observable<AdditionalFixture[]> = null; 

  constructor ( private fs: Firestore, private auth: Auth ) { }

  /** Observable of fixtures for the current user 
   *  Lazily instanciated so quey is only executed if required.
  */
  public get fixtures$() {
    if ( !this._fixtures$ ) {
      const fixturesRef = collection( this.fs, "fixtures" ) as CollectionReference<AdditionalFixture>;
      const q = query( fixturesRef, where( "userId", "==", this.auth.currentUser.uid ) );
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
    fixture.userId = this.auth.currentUser.uid;
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
