import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FixturesService } from 'app/fixtures/fixtures.service';

@Component({
  selector: 'app-fixture-search',
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './fixture-search.component.html',
  styleUrl: './fixture-search.component.scss'
})
export class FixtureSearchComponent {

  private fs = inject(FixturesService);

  searchVisible = signal(false);
  value = '';

  updateSearch(str: string) {
    const s = str.length < 2 ? '' : str;
    this.fs.setSearch(s);
  }

  // Close on focus loss if no search text specified
  onBlurring(searchValue: string) {
    if (!searchValue) {
      this.searchVisible.set(false);
    }
  }

  onKeyup(searchValue: string) {
    this.updateSearch(searchValue);
  }

  close() {
    this.searchVisible.set(false);
    this.value = '';
    this.updateSearch('');

  }

}
