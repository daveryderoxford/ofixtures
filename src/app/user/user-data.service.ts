import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { DocumentReference, Firestore, arrayRemove, arrayUnion, doc, docData, updateDoc } from "@angular/fire/firestore";
import { UserData, UserInfo } from "app/model";
import { Observable, of } from 'rxjs';
import { shareReplay, startWith, switchMap } from 'rxjs/operators';

@Injectable( {
  providedIn: "root"
} )
export class UserDataService {

  public user$: Observable<UserData | null>;

  private currentUser: UserData | null = null;
  private uid: string;

  constructor (
    private afAuth: AngularFireAuth,
    private fs: Firestore,
  ) {

    this.user$ = this.afAuth.authState.pipe(
      startWith( null ),
      switchMap( ( user: any ) => {
        console.log()
        if ( !user ) {
          console.log( "UserData: Firebase user null.  Stop monitoring user date  " );
          return of( null );
        } else {
          console.log( `UserData: monitoring uid: ${user.uid}` );
          return docData( this._doc( user.uid ))
        }
      } ),
      shareReplay(1)
    );

    /* Subscribe to update local cache - remove at some point */
    this.user$.subscribe( user => {
      if ( !user ) {
        console.log( "UserData: Local cache updated to nll " );
        this.currentUser = null;
        this.uid = null;
      } else {
        console.log( "UserData: Local cache updated to new value " );
        this.currentUser = user;
        this.uid = user.key;
      }
    } );

  }

  /** Get current user data  */
  get currentUserData(): UserData {
    return this.currentUser;
  }

  /** Update the user info.  Returning the modified user details */
  async updateDetails( details: Partial<UserInfo> ): Promise<void> {
    return updateDoc( this._getUserDoc(), details )
  }

  private _doc( uid: string ): DocumentReference<UserData> { 
    return doc( this.fs, "users/" + uid ) as DocumentReference<UserData>
  }

  /** Get the database documents associated with the user
   * The user must be logged in to use this function.
   */
  private _getUserDoc(): DocumentReference<UserData>  {
    return this._doc( this.uid );
  }

  /** Reserve a map for the user */
  async addFixtureReminder( eventId: string ): Promise<void> {
    await updateDoc( this._getUserDoc(), {
      reminders: arrayUnion( eventId ) as any
    } );
  }

  async removeFixtureReminder( eventId: string ): Promise<void> {
    await updateDoc( this._getUserDoc(), {
      reminders: arrayRemove( eventId ) as any
    } );
  }
}
