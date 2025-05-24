import { Injectable, signal } from '@angular/core';
import { Fixture } from './fixture';

@Injectable({
   providedIn: 'root'
})
export class SelectedFixture {
   _selectedFixture = signal<Fixture | undefined>(undefined);
   readonly selectedFixture = this._selectedFixture.asReadonly();

   setSelectedFixture(fixture: Fixture | undefined) {
      this._selectedFixture.set(fixture);
   }
}