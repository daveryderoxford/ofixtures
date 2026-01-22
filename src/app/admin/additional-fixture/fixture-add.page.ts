import { Component, viewChild, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Fixture } from 'app/fixtures/@store/fixture';
import { AdditionalFixtureService } from './@store/additional-fixture.service';
import { FixtureForm } from './fixture-form/fixture-form';

@Component({
    selector: 'app-fixture-add',
    template: `
    <app-fixture-form (submitted)="submitted($event)" />
  `,
    styles: [],
    imports: [FixtureForm],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixtureAddPage {
  private fs = inject(AdditionalFixtureService);
  private router = inject(Router);

  readonly fixtureForm = viewChild.required(FixtureForm);

  async submitted( fixture: Partial<Fixture> ) {
    await this.fs.add( fixture );
    this.router.navigate( ["/admin"] );
  }

  canDeactivate(): boolean {
    return this.fixtureForm().canDeactivate();
  }
}

