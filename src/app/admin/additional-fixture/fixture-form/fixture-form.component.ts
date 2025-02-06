
import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {  MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { EventDiscipline, EventGrade, EventType, eventDisciplines, eventGrades, eventTypes } from 'app/model';
import { AdditionalFixture, Fixture } from 'app/model/fixture';
import { formatISO } from 'date-fns';
import { FormContainerComponent } from "../../../shared/components/form-container/form-container.component";
import { ToolbarComponent } from '../../../shared/components/toolbar.component';
import { DateFnsAdapter, MAT_DATE_FNS_FORMATS, provideDateFnsAdapter } from '@angular/material-date-fns-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { enGB } from 'date-fns/locale';

@Component({
  selector: 'app-fixture-form',
  templateUrl: './fixture-form.component.html',
  styleUrls: ['./fixture-form.component.scss'],
  imports: [ToolbarComponent, FlexModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule, MatDatepickerModule, FormContainerComponent],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: enGB },
    { provide: DateAdapter, useClass: DateFnsAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_FORMATS },
    provideDateFnsAdapter(),
  ],
})
export class FixtureFormComponent {

  urlReg = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  what3wordsReg = /^\/{0,}[^0-9`~!@#$%^&*()+\-_=[{\]}\\|'<,.>?/";:£§º©®\s]{1,}[・.。][^ 0 - 9`~!@#$%^&*()+\-_=[{\]}\\|'<,.>?/";:£§º©®\s]{1,}[・.。][^0-9`~!@#$ %^&* () +\-_=[{ \]}\\| '<,.>?/";:£§º©®\s]{1,}$/;
  postcodeReg = /^[A-Z]{1,2}([0-9]{1,2}|[0-9][A-Z])\s*[0-9][A-Z]{2}$/gi;
  gridRefReg = /^[a-zA-Z]{2}[0-9]{6}|[0-9]{8}/;

  fixture = input<AdditionalFixture | undefined>();
  submitted = output<Partial<AdditionalFixture>>();

  form = new FormGroup({
    date: new FormControl('', { validators: [Validators.required] }),
    name: new FormControl('', { validators: [Validators.required] }),
    club: new FormControl('', { validators: [Validators.required] }),
    clubURL: new FormControl('', { validators: [Validators.pattern(this.urlReg)] }),
    postcode: new FormControl(''),
    gridRefString: new FormControl('', { validators: [Validators.pattern(this.gridRefReg)] }),
    what3words: new FormControl('', { validators: [Validators.pattern(this.what3wordsReg)] }),
    grade: new FormControl<EventGrade | ''>('', { validators: [Validators.required] }),
    type: new FormControl<EventType | ''>('', { validators: [Validators.required] }),
    discipline: new FormControl<EventDiscipline | ''>('', { validators: [Validators.required] }),
    webpage: new FormControl('', { validators: [Validators.pattern(this.urlReg)] }),
    area: new FormControl(''),
    nearestTown: new FormControl(''),
    association: new FormControl('', { validators: [Validators.required] }),
  });

  types = eventTypes;
  grades = eventGrades;
  disciplines = eventDisciplines;

  constructor() {
    effect(() => {
      if (this.fixture()) {
        this.form.patchValue(this.fixture()!);
      }
    });
  }

  submit() {
    const output: Partial<Fixture> = this.form.getRawValue() as Partial<Fixture>;
    // Convert date to iso string
    output.date = formatISO(new Date(output.date!));
    this.submitted.emit(output);
    this.form.reset();
  }

  public canDeactivate(): boolean {
    return !this.form.dirty;
  }
}

