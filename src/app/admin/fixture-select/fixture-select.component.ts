import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef, MatLegacyDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacySelectionList as MatSelectionList, MatLegacySelectionListChange as MatSelectionListChange, MatLegacyListModule } from '@angular/material/legacy-list';
import { UntilDestroy } from '@ngneat/until-destroy';
import { FixturesService } from 'app/fixtures/fixtures.service';
import { Fixture } from 'app/model';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EllipsisPipe } from '../../shared/pipes/ellipsis-pipe';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { MatLineModule } from '@angular/material/core';
import { CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf } from '@angular/cdk/scrolling';
import { MatLegacyInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule } from '@angular/material/legacy-form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacySlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FlexModule } from '@ngbracket/ngx-layout/flex';

@UntilDestroy( {} )
@Component({
    selector: 'app-fixture-select',
    templateUrl: './fixture-select.component.html',
    styleUrls: ['./fixture-select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
    MatLegacyDialogModule,
    FlexModule,
    MatLegacySlideToggleModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatLegacyFormFieldModule,
    MatLegacyInputModule,
    MatLegacyListModule,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    MatLineModule,
    MatLegacyButtonModule,
    AsyncPipe,
    DatePipe,
    EllipsisPipe
],
})
export class FixtureSelectComponent implements OnInit {

  fixtures$: Observable<Fixture[]>;
  filter: FormControl;
  filter$: Observable<string>;

  multiselect = false;
  selectedOnly = false;
  initialFilter = "";

  selection: SelectionModel<Fixture>;

  selectedOnlyControl;
  selectedOnly$: Observable<boolean>;

  @ViewChild( MatSelectionList ) list;

  constructor ( public fs: FixturesService,
    public dialogRef: MatDialogRef<FixtureSelectComponent, Fixture[]>,
    @Inject( MAT_DIALOG_DATA ) public data: { multiselect: boolean, initialFilter: string, selectedIds: string[] } ) { }

  ngOnInit(): void {
    this.multiselect = this.data.multiselect;

    this.selection = new SelectionModel( this.multiselect );

    if ( this.data.selectedIds ) {
      this.fs.allFixtues().subscribe( fixtures => {
        const selected = fixtures.filter( fix => this.data.selectedIds.includes( fix.id ) );
        this.selection.setSelection( ...selected );
      } );
    }

    this.filter = new FormControl( this.data.initialFilter );
    this.filter$ = this.filter.valueChanges.pipe( startWith( this.data.initialFilter ) );

    this.selectedOnlyControl = new FormControl( this.selectedOnly );
    this.selectedOnly$ = this.selectedOnlyControl.valueChanges.pipe( startWith( this.selectedOnly ) );

    this.fixtures$ = combineLatest( [this.fs.allFixtues(), this.filter$, this.selectedOnly$] ).pipe(
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
