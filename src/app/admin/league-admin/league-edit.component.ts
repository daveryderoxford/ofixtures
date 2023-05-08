import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from 'app/league/league-service';
import { League } from 'app/model/league';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LeagueFormComponent } from './league-form/league-form.component';

@Component( {
  selector: 'app-league-edit',
  template: `
    <app-league-form [league]="league$ | async" (submitted)="submitted($event)"></app-league-form>
  `,
  styles: [
  ]
} )
export class LeagueEditComponent implements OnInit {

  league$: Observable<League>;
  id: string;

  @ViewChild( LeagueFormComponent ) LeagueForm;

  constructor (private ls: LeagueService,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.league$ = this.route.paramMap.pipe(
      switchMap( params => {
        this.id = params.get( 'id' );
        return this.ls.leagues$.pipe(
          map( leagues => leagues.find( l => l.id === this.id))
        );
      } )
    );
  }

  async submitted(data: Partial<League>) {
    await this.ls.update( this.id, data );
  }

  canDeactivate(): boolean {
    return this.LeagueForm.canDeactivate();
  }

}
