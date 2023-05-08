import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CollectionReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from '@angular/fire/firestore';
import { League } from 'app/model/league';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

export function createLeague(data: Partial<League>): League {
  return 
}

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  leagues$: Observable<League[]>;
  
  constructor( private fs: Firestore,
    private auth: Auth) {
    const leagueCollection = collection( this.fs, 'leagues' ) as CollectionReference<League>;
    this.leagues$ = collectionData( leagueCollection ).pipe( shareReplay(1) );
  }

  async update(id: string, league: Partial<League>): Promise<void> {
    const d = doc( this.fs, 'leagues', id);
    await setDoc( d, league, { merge: true });
  }

  async add( league: Partial<League> ): Promise<void> {
    
    // Get document ref for new document
    const d = doc( collection( this.fs, "leagues" ) );
    league.userId = this.auth.currentUser.uid;
    league.id = d.id;

    await setDoc( d, league );

  }

  async delete(id: string) {
    const d = doc( this.fs, 'leagues', id );
    await deleteDoc( d );
  }
  
}
