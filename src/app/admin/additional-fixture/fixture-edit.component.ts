import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdditionalFixture, Fixture } from 'app/model/fixture';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FixtureFormComponent } from './fixture-form/fixture-form.component';
import { AdditionalFixtureService } from './additional-fixture.service';

@Component( {
  selector: 'app-fixture-edit',
  template: `
    <app-fixture-form [fixture]="fixture$ | async" (submitted)="submitted($event)"></app-fixture-form>
  `,
  styles: [
  ]
} )
export class FixtureEditComponent implements OnInit {

  fixture$: Observable<AdditionalFixture>;
  id: string;

  @ViewChild( FixtureFormComponent ) FixtureForm;

  constructor ( private fs: AdditionalFixtureService,
    private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit(): void {
    this.fixture$ = this.route.paramMap.pipe(
      switchMap( params => {
        this.id = params.get( 'id' );
        return this.fs.fixtures$.pipe(
          map( fixtures => fixtures.find( l => l.id === this.id ) )
        );
      } )
    );
  }

  async submitted( data: Partial<Fixture> ) {
    await this.fs.update( this.id, data );
    this.router.navigate( ["/admin"] );
  }

  canDeactivate(): boolean {
    return this.FixtureForm.canDeactivate();
  }

}
