import { Injectable, inject } from '@angular/core';
import { CollectionReference, Firestore, collection, collectionData, deleteDoc, doc, setDoc } from '@angular/fire/firestore';
import { League } from 'app/model/league';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { isAfter } from 'date-fns';
import { FixturesService } from 'app/fixtures/fixtures.service';
import { AuthService } from 'app/auth/auth.service';

@Injectable( {
  providedIn: 'root'
} )
export class LeagueService {
  private fs = inject(Firestore);
  private auth = inject(AuthService);
  private fixtureService = inject(FixturesService);

  private readonly _selectedLeague = new BehaviorSubject<League | null>( null );
  readonly selected$ = this._selectedLeague.asObservable();

  /** All leagues with any fixtures in the future */
  leagues$: Observable<League[]>;

  constructor () {

    const leagueCollection = collection( this.fs, 'leagues' ) as CollectionReference<League>;

    this.leagues$ = collectionData<League>( leagueCollection ).pipe(
      shareReplay( 1 ),
      map( leagues =>
        leagues.filter( league => isAfter( new Date( league.endDate ), Date.now() ) && league.fixtureIds.length > 0 ).sort( ( a, b ) => a.startDate.localeCompare( b.startDate ) )
      ),
    );
  }

  async update( id: string, league: Partial<League> ): Promise<void> {
    const d = doc( this.fs, 'leagues', id );
    await setDoc( d, league, { merge: true } );
  }

  async add( league: Partial<League> ): Promise<void> {

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

  setSelected( league: League | null ) {
    if ( league ) {
      if ( this._selectedLeague.value?.id !== league.id ) {
        this._selectedLeague.next( { ...league } );
        this.fixtureService.setSelectedFixture( null );
      }
    } else {
      if ( this._selectedLeague.value !== null ) {
        this._selectedLeague.next( null );
      }
    }
  }
}
