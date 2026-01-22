import { ChangeDetectionStrategy, Component, computed, effect, inject, input, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Fixture } from 'app/fixtures/@store/fixture';
import { AdditionalFixtureService } from './@store/additional-fixture.service';
import { FixtureForm } from './fixture-form/fixture-form';

@Component({
    selector: 'app-fixture-edit',
    template: `
    <app-fixture-form [fixture]="fixture()" (submitted)="submitted($event)" />
  `,
    styles: [],
    imports: [FixtureForm],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixtureEditPage {
  private fs = inject(AdditionalFixtureService);
  private router = inject(Router);

  // Route parameter
  id = input<string>('');

  fixtures = toSignal(this.fs.fixtures$, {initialValue: []});

  fixture = computed(() => this.fixtures().find(l => l.id === this.id())! );

  readonly FixtureForm = viewChild.required(FixtureForm);

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
