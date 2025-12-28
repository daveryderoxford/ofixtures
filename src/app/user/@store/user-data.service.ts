import { Injectable, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Auth, authState } from "@angular/fire/auth";
import type { DocumentReference } from "@angular/fire/firestore";
import { FirestoreProviderAsync, fsModule } from 'app/shared/services/firestore-provider-async';
import { Observable, of } from 'rxjs';
import { shareReplay, startWith, switchMap } from 'rxjs/operators';
import { UserData, userConverter } from './user';

@Injectable({
  providedIn: "root"
})
export class UserDataService {
  private auth = inject(Auth);
  private firestore = inject(FirestoreProviderAsync);

  private userdata$: Observable<UserData | undefined> = authState(this.auth).pipe(
    switchMap(u => u ? this.ref(u.uid) : Promise.resolve(undefined)),
    switchMap( doc => {
      if (doc) {
        console.log(`UserData: monitoring uid: ${doc.id}`);
        return fsModule!.docData(doc);
      } else {
        console.log("UserData: Firebase user null.  Stop monitoring user date  ");
        return of(undefined);
      }
    }),
    startWith(undefined),
    shareReplay(1)
  );

  userdata = toSignal(this.userdata$);

  /** Load firestore asychrsanously  */
  private async ref(id: string): Promise<DocumentReference<UserData>> {
    const fs = await this.firestore.getFirestore();
    return fsModule!.doc(fs, 'users', id).withConverter(userConverter);
  }

  /** Update the user info.  Returning the modified user details */
  async updateDetails(details: Partial<UserData>): Promise<void> {
    if (this.userdata()) {
      console.log('UserDataService: Saving user' + this.userdata()!!.key);
      const doc = await this.ref(this.userdata()!.key);
      return fsModule!.updateDoc(doc, details);
    } else {
      console.log('UserDataService: Saving user: Unexectly null');
      throw Error('UserDataService: Saving user: Unexectly null');
    }
  }

  /** Reserve a map for the user */
  async addFixtureReminder(eventId: string): Promise<void> {
    const doc = await this.ref(this.userdata()!.key);
    await fsModule!.updateDoc(doc, {
      reminders: fsModule!.arrayUnion(eventId) as any
    });
  }

  async removeFixtureReminder(eventId: string): Promise<void> {
    const doc = await this.ref(this.userdata()!.key);
    await fsModule!.updateDoc(doc, {
      reminders: fsModule!.arrayRemove(eventId) as any
    });
  }
}
