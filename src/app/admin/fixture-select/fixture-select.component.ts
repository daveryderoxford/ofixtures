import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, OnInit, viewChild, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSelectionList, MatSelectionListChange, MatListModule } from '@angular/material/list';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EllipsisPipe } from '../../shared/pipes/ellipsis-pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatLineModule } from '@angular/material/core';
import { CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf } from '@angular/cdk/scrolling';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { toObservable } from '@angular/core/rxjs-interop';
import { FixturesService } from 'app/fixtures/@store/fixtures.service';
import { Fixture } from 'app/fixtures/@store/fixture';

@UntilDestroy( {} )
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
        AsyncPipe,
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

  fixtures$!: Observable<Fixture[]>;
  filter!: FormControl;
  filter$!: Observable<string>;

  multiselect = false;
  selectedOnly = false;
  initialFilter = "";

  selection!: SelectionModel<Fixture>;

  selectedOnlyControl!: FormControl;
  selectedOnly$!: Observable<boolean>;

  readonly list = viewChild.required(MatSelectionList);

  ngOnInit(): void {
    this.multiselect = this.data.multiselect;

    this.selection = new SelectionModel( this.multiselect );

    // TODO convert all to signals at some point
    const allFixtures$ = toObservable(this.fs.fixtures);

    if ( this.data.selectedIds ) {
      allFixtures$.subscribe( fixtures => {
        const selected = fixtures.filter( fix => this.data.selectedIds.includes( fix.id ) );
        this.selection.setSelection( ...selected );
      } );
    }

    this.filter = new FormControl( this.data.initialFilter );
    this.filter$ = this.filter.valueChanges.pipe( startWith( this.data.initialFilter ) );

    this.selectedOnlyControl = new FormControl( this.selectedOnly );
    this.selectedOnly$ = this.selectedOnlyControl.valueChanges.pipe( startWith( this.selectedOnly ) );

    this.fixtures$ = combineLatest( [allFixtures$, this.filter$, this.selectedOnly$] ).pipe(
      map( ( [fixtures, filter, selectedOnly] ) => this._filterFixtures( fixtures, filter, selectedOnly ) )
    );
  }

  private _filterFixtures( fixtures: Fixture[], filter: string, selectedOnly: boolean ): Fixture[] {
    const str = filter.trim().toLowerCase();
    return fixtures.filter( fixture => this._stringFilter( str, fixture ) && this._selectionFilter( selectedOnly, fixture ) );
  }

  private _stringFilter( filterStr: string, fixture: Fixture ): boolean {
    if ( filterStr === "" ) {
      return true
    } else {
      return fixture.club?.toLowerCase().includes( filterStr ) ||
        fixture.name.toLowerCase().includes( filterStr ) ||
        fixture.date.toLowerCase().includes( filterStr ) ||
        fixture.area?.toLowerCase().includes( filterStr );
    }
  }

  private _selectionFilter( selectedOnly: boolean, fixture: Fixture ): boolean {
    if ( selectedOnly ) {
      return this.selection.selected.includes( fixture );
    } else {
      return true;
    }
  }

  onSelectionChange( selection: MatSelectionListChange ) {
    selection.options.forEach( option => {
      option.selected
        ? this.selection.select( option.value )
        : this.selection.deselect( option.value );
    } );

  }

  onSubmit() {
    this.dialogRef.close( this.selection.selected );
  }
}
