import { Component } from '@angular/core';

import { SearchInputComponent } from './search-input/search-input.component';
import { FormControl } from '@angular/forms';
import { FixturesService } from 'app/fixtures/fixtures.service';
import { debounce, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-fixture-search',
  standalone: true,
  imports: [SearchInputComponent],
  template: `<app-search-input  placeholder="Name, Club, Area, Location" (onStringChange)="updateSearch($event)">
             </app-search-input>`,
  styles: [],
})

export class FixtureSearchComponent {

  constructor(private fs: FixturesService) { }

  updateSearch(str: string) {
    const s = str.length < 2 ? '' : str;
    this.fs.setSearch(s);
  }

}
