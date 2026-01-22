import { Component, computed, inject, input, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from 'app/league/@store/league-service';
import { League } from 'app/league/@store/league';
import { LeagueForm } from './league-form/league-form';

@Component({
    selector: 'app-league-edit-page',
    template: `
    <app-league-form [league]="league()" (submitted)="submitted($event)" />
  `,
    styles: [],
    imports: [LeagueForm]
})
export class LeagueEditPage {
  private ls = inject(LeagueService);
  private route = inject(ActivatedRoute);

  readonly LeagueForm = viewChild.required(LeagueForm);

  id = input.required<string>(); // Route parameter

  league = computed(() => this.ls.leagues.value().find(l => l.id === this.id()));

  async submitted(data: Partial<League>) {
    await this.ls.update( this.id(), data );
  }

  canDeactivate(): boolean {
    return this.LeagueForm().canDeactivate();
  }
}
