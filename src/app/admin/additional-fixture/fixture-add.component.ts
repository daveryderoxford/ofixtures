import { Component, viewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Fixture } from 'app/model/fixture';
import { AdditionalFixtureService } from './additional-fixture.service';
import { FixtureFormComponent } from './fixture-form/fixture-form.component';

@Component({
    selector: 'app-fixture-add',
    template: `
    <app-fixture-form (submitted)="submitted($event)"></app-fixture-form>
  `,
    styles: [],
    imports: [FixtureFormComponent]
})
export class FixtureAddComponent {
  private fs = inject(AdditionalFixtureService);
  private router = inject(Router);


  readonly fixtureForm = viewChild(FixtureFormComponent);

  async submitted( fixture: Partial<Fixture> ) {
    await this.fs.add( fixture );
    this.router.navigate( ["/admin"] );
  }

  canDeactivate(): boolean {
    return this.fixtureForm().canDeactivate();
  }

}

