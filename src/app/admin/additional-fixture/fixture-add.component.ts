import { Component, viewChild, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Fixture } from 'app/fixtures/@store/fixture';
import { AdditionalFixtureService } from './@store/additional-fixture.service';
import { FixtureFormComponent } from './fixture-form/fixture-form.component';

@Component({
    selector: 'app-fixture-add',
    template: `
    <app-fixture-form (submitted)="submitted($event)" />
  `,
    styles: [],
    imports: [FixtureFormComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixtureAddComponent {
  private fs = inject(AdditionalFixtureService);
  private router = inject(Router);

  readonly fixtureForm = viewChild.required(FixtureFormComponent);

  async submitted( fixture: Partial<Fixture> ) {
    await this.fs.add( fixture );
    this.router.navigate( ["/admin"] );
  }

  canDeactivate(): boolean {
    return this.fixtureForm().canDeactivate();
  }
}

