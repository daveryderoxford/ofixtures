import { Component, inject } from '@angular/core';

import { FixturesService } from 'app/fixtures/fixtures.service';
import { SearchInputComponent } from './search-input/search-input.component';

@Component({
    selector: 'app-fixture-search',
    imports: [SearchInputComponent],
    template: `<app-search-input  placeholder="Name, Club, Area, Location" (onStringChange)="updateSearch($event)">
             </app-search-input>`,
    styles: []
})

export class FixtureSearchComponent {
      private fs = inject(FixturesService);

  updateSearch(str: string) {
    const s = str.length < 2 ? '' : str;
    this.fs.setSearch(s);
  }

}
