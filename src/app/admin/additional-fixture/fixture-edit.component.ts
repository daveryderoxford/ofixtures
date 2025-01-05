import { Component, ViewChild, computed, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fixture } from 'app/model/fixture';
import { AdditionalFixtureService } from './additional-fixture.service';
import { FixtureFormComponent } from './fixture-form/fixture-form.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-fixture-edit',
    template: `
    <app-fixture-form [fixture]="fixture()" (submitted)="submitted($event)"></app-fixture-form>
  `,
    styles: [],
    imports: [FixtureFormComponent]
})
export class FixtureEditComponent {

  // Route parameter
  id = input<string>('');

  fixtures = toSignal(this.fs.fixtures$);

  fixture = computed(() => this.fixtures().find(l => l.id === this.id()) );

  @ViewChild( FixtureFormComponent ) FixtureForm;

  constructor ( private fs: AdditionalFixtureService,
    private route: ActivatedRoute,
    private router: Router ) { }

  async submitted( data: Partial<Fixture> ) {
    await this.fs.update( this.id(), data );
    this.router.navigate( ["/admin"] );
  }

  canDeactivate(): boolean {
    return this.FixtureForm.canDeactivate();
  }

}
