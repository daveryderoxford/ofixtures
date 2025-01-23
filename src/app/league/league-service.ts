import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CollectionReference, Firestore, collection, collectionData, deleteDoc, doc, setDoc } from '@angular/fire/firestore';
import { AuthService } from 'app/auth/auth.service';
import { League } from 'app/model/league';
import { isAfter } from 'date-fns';
import { map, shareReplay } from 'rxjs/operators';

@Injectable( {
  providedIn: 'root'
} )
export class LeagueService {
  private fs = inject(Firestore);
  private auth = inject(AuthService);

  /** All leagues with any fixtures in the future */
  private leagueCollection = collection(this.fs, 'leagues') as CollectionReference<League>;

  private leagues$ = collectionData<League>(this.leagueCollection).pipe(
      shareReplay(1),
      map(leagues =>
        leagues.filter(league => isAfter(new Date(league.endDate), Date.now()) && league.fixtureIds.length > 0).sort((a, b) => a.startDate.localeCompare(b.startDate))
      ),
    );

  leagues = toSignal(this.leagues$, {initialValue: []});

  findById(id: string | undefined): League | undefined {
    if (!id) return undefined;
    return this.leagues().find(league => league.id === id);
  }

  async update( id: string, league: Partial<League> ): Promise<void> {
    const d = doc( this.fs, 'leagues', id );
    await setDoc( d, league, { merge: true } );
  }

  async add( league: Partial<League>): Promise<void> {

    // Get document ref for new document
    const d = doc( collection( this.fs, "leagues" ) );
    league.userId = this.auth.user()!.uid;
    league.id = d.id;

    await setDoc( d, league );

  }

  async delete( id: string ): Promise<void> {
    const d = doc( this.fs, 'leagues', id );
    await deleteDoc( d );
  }

}
