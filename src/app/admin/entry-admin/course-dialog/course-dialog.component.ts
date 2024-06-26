/** Entry course dialog  */
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogModule } from '@angular/material/legacy-dialog';
import { EntryCourse } from 'app/model/entry';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';

import { MatLegacyInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule } from '@angular/material/legacy-form-field';


@Component({
    selector: 'app-course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatLegacyDialogModule, ReactiveFormsModule, MatLegacyFormFieldModule, MatLegacyInputModule, MatLegacyButtonModule]
})
export class CourseDialogComponent implements OnInit {

  form: UntypedFormGroup;
  hasAgeClasses: boolean;

  constructor ( private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: { hasAgeClasses: boolean, course: EntryCourse } ) { }

  ngOnInit() {
    const course = this.data.course;
    this.hasAgeClasses = this.data.hasAgeClasses;

    this.form = this.formBuilder.group( {
      name: [course.name, Validators.required],
      maxMaps: [course.maxMaps, [Validators.min( 0 ), Validators.pattern( "^[0-9]+$" )]],
      distance: [course.distance, Validators.min( 0 )],
      climb: [course.climb, [Validators.min( 0 ), Validators.pattern( "^[0-9]+$" )]],
      ageClasses: [course.ageClasses],
      reservedMaps: [course.reservedMaps]  // No associated control
    } );
  }

  onSubmit() {
    this.dialogRef.close( this.form.value );
  }

}
