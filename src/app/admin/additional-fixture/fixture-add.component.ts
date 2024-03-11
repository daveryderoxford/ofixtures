import { Component, ViewChild } from '@angular/core';
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
    standalone: true,
    imports: [FixtureFormComponent]
})
export class FixtureAddComponent {

  @ViewChild( FixtureFormComponent ) fixtureForm;

  constructor ( private fs: AdditionalFixtureService,
    private router: Router ) { }

  async submitted( fixture: Partial<Fixture> ) {
    await this.fs.add( fixture );
    this.router.navigate( ["/admin"] );
  }

  canDeactivate(): boolean {
    return this.fixtureForm.canDeactivate();
  }

}

