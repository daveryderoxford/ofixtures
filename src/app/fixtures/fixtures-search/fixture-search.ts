import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FixturesService } from 'app/fixtures/@store/fixtures.service';
import { FilteredFixtures } from '../@store/filtered-fixtures';

@Component({
  selector: 'app-fixture-search',
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './fixture-search.html',
  styleUrl: './fixture-search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixtureSearch {

  protected fs = inject(FilteredFixtures);

  searchVisible = signal(false);

  updateSearch(str: string) {
    this.fs.setSearch(str);
  }

  // Close on focus loss if no search text specified
  onBlurring(searchValue: string) {
    if (!searchValue) {
      this.searchVisible.set(false);
    }
  }

  close() {
    this.searchVisible.set(false);
    this.updateSearch('');
  }

}
