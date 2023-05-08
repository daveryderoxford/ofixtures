import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { FixtureSelectComponent } from 'app/admin/fixture-select/fixture-select.component';
import { Fixture } from 'app/model';
import { League, LeagueLevel, LeagueType, leagueLevels, leagueTypes } from 'app/model/league';
import { Observable } from 'rxjs';

@UntilDestroy( { checkProperties: true } )
@Component( {
  selector: 'app-league-form',
  templateUrl: './league-form.component.html',
  styleUrls: ['./league-form.component.scss']
} )
export class LeagueFormComponent implements OnInit {
  form;
  selectedFixtureIds: string[] = [];
  start: string;
  end: string;

  @Input() set league( l: League ) {
    if ( l ) {
      this.form?.patchValue( l );
      this.selectedFixtureIds = l.fixtureIds;
    }
  };
  @Output() submitted = new EventEmitter<Partial<League>>();

  leagueTypes = leagueTypes;
  leagueLevels = leagueLevels;

  cardclass = "";

  constructor ( private dialog: MatDialog ) { }

  ngOnInit() {
    const urlReg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    this.form = new FormGroup( {
      name: new FormControl( '', { validators: [Validators.required] } ),
      url: new FormControl( '', { validators: [Validators.required, Validators.pattern( urlReg )] } ),
      type: new FormControl<LeagueType | ''>( '', { validators: [Validators.required] } ),
      level: new FormControl<LeagueLevel | ''>( '', { validators: [Validators.required] } )
    } );
  }

  submit() {
    const output: Partial<League> = this.form.getRawValue();
    output.fixtureIds = this.selectedFixtureIds;
    output.startDate = this.start;
    output.endDate = this.end;
    this.submitted.emit( output );
    this.form.reset();
  }

  selectFixtures() {
    this._displayFixtureSelectDialog().subscribe( fixtures => {
      this.selectedFixtureIds = fixtures.map( fix => fix.id );
      if ( fixtures.length > 0 ) {
        this.start = fixtures[0].date;
        this.end = fixtures[fixtures.length - 1].date;
      }

    } );
  }

  private _displayFixtureSelectDialog(): Observable<Fixture[]> {

    const dialogRef = this.dialog.open( FixtureSelectComponent, {
      width: '350px',
      maxWidth: '100vw',
      //  maxHeight: '100vh',
      data: { multiselect: true, initialFilter: "", selected: this.selectedFixtureIds },
    } );

    return dialogRef.afterClosed();
  }

  public canDeactivate(): boolean {
    return !this.form.dirty;
  }

}
