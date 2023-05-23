import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { UntilDestroy } from '@ngneat/until-destroy';
import { FixturesService } from 'app/fixtures/fixtures.service';
import { Fixture } from 'app/model';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@UntilDestroy( {} )
@Component( {
  selector: 'app-fixture-select',
  templateUrl: './fixture-select.component.html',
  styleUrls: ['./fixture-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
} )
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
      return fixture.club.toLowerCase().includes( filterStr ) ||
        fixture.name.toLowerCase().includes( filterStr ) ||
        fixture.date.toLowerCase().includes( filterStr ) ||
        fixture.area.toLowerCase().includes( filterStr );
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
