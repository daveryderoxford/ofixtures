import { ChangeDetectionStrategy, Component, computed, effect, inject, input, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Fixture } from 'app/model/fixture';
import { AdditionalFixtureService } from './additional-fixture.service';
import { FixtureFormComponent } from './fixture-form/fixture-form.component';

@Component({
    selector: 'app-fixture-edit',
    template: `
    <app-fixture-form [fixture]="fixture()" (submitted)="submitted($event)" />
  `,
    styles: [],
    imports: [FixtureFormComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixtureEditComponent {
  private fs = inject(AdditionalFixtureService);
  private router = inject(Router);

  // Route parameter
  id = input<string>('');

  fixtures = toSignal(this.fs.fixtures$, {initialValue: []});

  fixture = computed(() => this.fixtures().find(l => l.id === this.id())! );

  readonly FixtureForm = viewChild.required(FixtureFormComponent);

  constructor() {
    effect(() => {
      console.log('Fixture in add: ' + this.fixture());
  });
}

  async submitted( data: Partial<Fixture> ) {
    await this.fs.update( this.id(), data );
    this.router.navigate( ["/admin"] );
  }

  canDeactivate(): boolean {
    return this.FixtureForm().canDeactivate();
  }
}
