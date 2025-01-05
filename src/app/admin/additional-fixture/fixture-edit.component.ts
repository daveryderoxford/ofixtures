import { Component, computed, input, viewChild, inject } from '@angular/core';
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
  private fs = inject(AdditionalFixtureService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);


  // Route parameter
  id = input<string>('');

  fixtures = toSignal(this.fs.fixtures$);

  fixture = computed(() => this.fixtures().find(l => l.id === this.id()) );

  readonly FixtureForm = viewChild(FixtureFormComponent);

  async submitted( data: Partial<Fixture> ) {
    await this.fs.update( this.id(), data );
    this.router.navigate( ["/admin"] );
  }

  canDeactivate(): boolean {
    return this.FixtureForm().canDeactivate();
  }

}
