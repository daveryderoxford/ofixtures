import { Injectable, inject, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { CollectionReference, collection, collectionData, deleteDoc, doc, setDoc } from '@angular/fire/firestore';
import { AuthService } from 'app/auth/auth.service';
import { League } from 'app/model/league';
import { FirestoreProvider } from 'app/shared/services/firestore-provider';
import { LazyInject } from 'app/shared/services/lazy-injector';
import { isAfter } from 'date-fns';
import { Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  private fs = inject(FirestoreProvider).getFirestore();
  private auth = inject(AuthService);

  /** All leagues with any fixtures in the future */
  private leagueCollection = collection(this.fs, 'leagues') as CollectionReference<League>;

  private leagueResource = rxResource<League[], boolean>({
    loader: () => {
      console.log('Leagueservice: Load Leagues');
      return collectionData<League>(this.leagueCollection).pipe(
        shareReplay(1),
        map(leagues =>
          leagues.filter(league => isAfter(new Date(league.endDate), Date.now()) && league.fixtureIds.length > 0).sort((a, b) => a.startDate.localeCompare(b.startDate))
        ),
        tap(l => console.log('Leagueservice: Num Leeagues: ' + l.length))

      );
    },
    defaultValue: [],
  });

 leagues= this.leagueResource.asReadonly();

  findById(id: string | undefined): League | undefined {
    if (!id) return undefined;
    return this.leagues.value().find(league => league.id === id);
  }

  async update(id: string, league: Partial<League>): Promise<void> {
    const d = doc(this.fs, 'leagues', id);
    await setDoc(d, league, { merge: true });
  }

  async add(league: Partial<League>): Promise<void> {

    // Get document ref for new document
    const d = doc(collection(this.fs, "leagues"));
    league.userId = this.auth.user()!.uid;
    league.id = d.id;

    await setDoc(d, league);

  }

  async delete(id: string): Promise<void> {
    const d = doc(this.fs, 'leagues', id);
    await deleteDoc(d);
  }

}
