/** Entry course dialog  */
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EntryCourse } from 'app/model/entry';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class CourseDialogComponent {
  private formBuilder = inject(FormBuilder);
  dialogRef = inject<MatDialogRef<CourseDialogComponent>>(MatDialogRef);
  data = inject<{
    hasAgeClasses: boolean;
    course: EntryCourse;
  }>(MAT_DIALOG_DATA);

  private course = this.data.course;
  protected hasAgeClasses = this.data.hasAgeClasses;

  form = this.formBuilder.group({
    name: [this.course.name, Validators.required],
    maxMaps: [this.course.maxMaps, [Validators.min(0), Validators.pattern("^[0-9]+$")]],
    distance: [this.course.distance, Validators.min(0)],
    climb: [this.course.climb, [Validators.min(0), Validators.pattern("^[0-9]+$")]],
    ageClasses: [this.course.ageClasses],
    reservedMaps: [this.course.reservedMaps]  // No associated control
  });

  onSubmit() {
    this.dialogRef.close(this.form.value);
  }
}
