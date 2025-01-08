import { Component, viewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LeagueService } from 'app/league/league-service';
import { League } from 'app/model/league';
import { LeagueFormComponent } from './league-form/league-form.component';

@Component({
    selector: 'app-league-add',
    template: `
    <app-league-form (submitted)="submitted($event)"></app-league-form>
  `,
    styles: [],
    imports: [LeagueFormComponent]
})
export class LeagueAddComponent {
private ls = inject(LeagueService);
private router = inject(Router);


readonly LeagueForm = viewChild.required(LeagueFormComponent);

  async submitted(league: Partial<League>) {
    await this.ls.add( league );
    this.router.navigate(["/admin"]);
  }

  canDeactivate(): boolean {
    return this.LeagueForm().canDeactivate();
  }

}
