import { Component, OnInit, viewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from 'app/league/league-service';
import { League } from 'app/model/league';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LeagueFormComponent } from './league-form/league-form.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-league-edit',
    template: `
    <app-league-form [league]="league$ | async" (submitted)="submitted($event)"></app-league-form>
  `,
    styles: [],
    imports: [LeagueFormComponent, AsyncPipe]
})
export class LeagueEditComponent implements OnInit {
  private ls = inject(LeagueService);
  private route = inject(ActivatedRoute);


  league$: Observable<League>;
  id: string;

  readonly LeagueForm = viewChild(LeagueFormComponent);

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
    return this.LeagueForm().canDeactivate();
  }

}
