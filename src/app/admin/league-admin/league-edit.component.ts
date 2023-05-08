import { Component, OnInit, ViewChild } from '@angular/core';
import { LeagueService } from 'app/league/league-service';
import { League } from 'app/model/league';
import { Observable } from 'rxjs';
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

  @ViewChild( LeagueFormComponent ) LeagueForm;

  constructor (private ls: LeagueService) { }

  ngOnInit(): void {
  }

  async submitted(data: Partial<League>) {
    await this.ls.update( data.id, data );
  }

  canDeactivate(): boolean {
    return this.LeagueForm.canDeactivate();
  }

}
