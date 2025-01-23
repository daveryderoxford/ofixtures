import { Component, OnChanges, SimpleChanges, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { UntilDestroy } from '@ngneat/until-destroy';
import { FixtureSelectComponent } from 'app/admin/fixture-select/fixture-select.component';
import { Fixture } from 'app/model';
import { League, LeagueLevel, LeagueType, leagueLevels, leagueTypes } from 'app/model/league';
import { Observable } from 'rxjs';
import { FormContainerComponent } from "../../../shared/components/form-container/form-container.component";
import { ToolbarComponent } from '../../../shared/components/toolbar.component';

@UntilDestroy( { checkProperties: true } )
@Component({
    selector: 'app-league-form',
    templateUrl: './league-form.component.html',
    styles: '',
    imports: [ToolbarComponent, FlexModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule, MatDividerModule, FormContainerComponent]
})
export class LeagueFormComponent implements OnChanges {
  private dialog = inject(MatDialog);

  //form;
  selectedFixtureIds: string[] = [];
  start!: string;
  end!: string;

  league = input<League | undefined | null>();
  submitted = output<Partial<League>>();

  leagueTypes = leagueTypes;
  leagueLevels = leagueLevels;
  eventsEdited = false;

  urlReg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

  form = new FormGroup( {
    name: new FormControl( '', { validators: [Validators.required] } ),
    url: new FormControl( '', { validators: [Validators.required, Validators.pattern( this.urlReg )] } ),
    type: new FormControl<LeagueType | ''>( '', { validators: [Validators.required] } ),
    level: new FormControl<LeagueLevel | ''>( '', { validators: [Validators.required] } )
  } );

  cardclass = "";

  ngOnChanges( changes: SimpleChanges ) {
    if ( changes.league?.currentValue ) {
      const update = this.league()!
      this.form.patchValue(update);
      this.selectedFixtureIds = update.fixtureIds;
      this.start = update.startDate!;
      this.end = update.endDate!;
    }
  }

  submit() {
    const output: Partial<League> = this.form.getRawValue() as Partial<League>;
    output.fixtureIds = this.selectedFixtureIds;
    output.startDate = this.start;
    output.endDate = this.end;
    this.submitted.emit( output );
    this.form.reset();
    this.eventsEdited = false;
  }

  selectFixtures() {
    this._displayFixtureSelectDialog().subscribe( fixtures => {
      if ( fixtures ) {
        this.eventsEdited = true;
        this.selectedFixtureIds = fixtures.map( fix => fix.id );
        if ( fixtures.length > 0 ) {
          this.start = fixtures[0].date;
          this.end = fixtures[fixtures.length - 1].date;
        }
      }
    } );
  }

  private _displayFixtureSelectDialog(): Observable<Fixture[]> {

    const dialogRef = this.dialog.open( FixtureSelectComponent, {
      width: '350px',
      maxWidth: '100vw',
      //  maxHeight: '100vh',
      data: { multiselect: true, initialFilter: "", selectedIds: this.selectedFixtureIds },
    } );

    return dialogRef.afterClosed();
  }

  public canDeactivate(): boolean {
    return !this.form.dirty;
  }
}
