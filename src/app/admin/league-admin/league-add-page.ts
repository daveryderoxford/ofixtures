import { Component, viewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LeagueService } from 'app/league/@store/league-service';
import { League } from 'app/league/@store/league';
import { LeagueForm } from './league-form/league-form';

@Component({
    selector: 'app-league-add-page',
    template: `
    <app-league-form (submitted)="submitted($event)" />
  `,
    styles: [],
    imports: [LeagueForm]
})
export class LeagueAddPage {
private ls = inject(LeagueService);
private router = inject(Router);


readonly LeagueForm = viewChild.required(LeagueForm);

  async submitted(league: Partial<League>) {
    await this.ls.add( league );
    this.router.navigate(["/admin"]);
  }

  canDeactivate(): boolean {
    return this.LeagueForm().canDeactivate();
  }

}
