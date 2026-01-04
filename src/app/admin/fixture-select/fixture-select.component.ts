import { ChangeDetectionStrategy, Component, OnInit, viewChild, inject, signal, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSelectionList, MatSelectionListChange, MatListModule } from '@angular/material/list';
import { startWith } from 'rxjs/operators';
import { EllipsisPipe } from '../../shared/pipes/ellipsis-pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatLineModule } from '@angular/material/core';
import { CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf } from '@angular/cdk/scrolling';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DatePipe } from '@angular/common';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { toSignal } from '@angular/core/rxjs-interop';
import { FixturesService } from 'app/fixtures/@store/fixtures.service';
import { Fixture } from 'app/fixtures/@store/fixture';

@Component({
    selector: 'app-fixture-select',
    templateUrl: './fixture-select.component.html',
    styleUrls: ['./fixture-select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatDialogModule,
        FlexModule,
        MatSlideToggleModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        CdkVirtualScrollViewport,
        CdkFixedSizeVirtualScroll,
        CdkVirtualForOf,
        MatLineModule,
        MatButtonModule,
        DatePipe,
        EllipsisPipe
    ]
})
export class FixtureSelectComponent implements OnInit {
  fs = inject(FixturesService);

  dialogRef = inject<MatDialogRef<FixtureSelectComponent, Fixture[]>>(MatDialogRef);

  data = inject<{
    multiselect: boolean;
    initialFilter: string;
    selectedIds: string[];
}>(MAT_DIALOG_DATA);

  selection = signal<Fixture[]>([]);

  filterControl = new FormControl(this.data.initialFilter || '', { nonNullable: true });
  filter = toSignal(this.filterControl.valueChanges.pipe(startWith(this.data.initialFilter || '')), { requireSync: true });

  selectedOnlyControl = new FormControl(false, { nonNullable: true });
  selectedOnly = toSignal(this.selectedOnlyControl.valueChanges.pipe(startWith(false)), { requireSync: true });

  filteredFixtures = computed(() => {
    const fixtures = this.fs.fixtures();
    const filter = this.filter();
    const selectedOnly = this.selectedOnly();
    const currentSelection = this.selection();

    return this._filterFixtures(fixtures, filter, selectedOnly, currentSelection);
  });

  readonly list = viewChild.required(MatSelectionList);

  ngOnInit(): void {
    if (this.data.selectedIds && this.data.selectedIds.length > 0) {
      const initial = this.fs.fixtures().filter(f => this.data.selectedIds.includes(f.id));
      this.selection.set(initial);
    }
  }

  private _filterFixtures( fixtures: Fixture[], filter: string, selectedOnly: boolean, selection: Fixture[] ): Fixture[] {
    const str = filter.trim().toLowerCase();
    return fixtures.filter( fixture => this._stringFilter( str, fixture ) && (!selectedOnly || selection.includes(fixture)) );
  }

  private _stringFilter( filterStr: string, fixture: Fixture ): boolean {
    if ( filterStr === "" ) {
      return true;
    } else {
      return fixture.club?.toLowerCase().includes( filterStr ) ||
        fixture.name.toLowerCase().includes( filterStr ) ||
        fixture.date.toLowerCase().includes( filterStr ) ||
        fixture.area?.toLowerCase().includes( filterStr );
    }
  }

  isSelected(fixture: Fixture): boolean {
    return this.selection().includes(fixture);
  }

  onSelectionChange( selection: MatSelectionListChange ) {
    this.selection.update(selected => {
      const newSelected = [...selected];
      selection.options.forEach(option => {
        if (option.selected) {
          if (!newSelected.includes(option.value)) newSelected.push(option.value);
        } else {
          const idx = newSelected.indexOf(option.value);
          if (idx > -1) newSelected.splice(idx, 1);
        }
      });
      return newSelected;
    });
  }

  onSubmit() {
    this.dialogRef.close( this.selection() );
  }
}
