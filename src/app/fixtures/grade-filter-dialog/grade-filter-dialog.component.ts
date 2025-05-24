import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GradeFilter } from 'app/fixtures/@store/fixture-filter';
import { eventGrades } from 'app/oevent/oevent';

@Component({
   selector: 'app-filter',
   templateUrl: './grade-filter-dialog.component.html',
   styleUrls: ['./grade-filter-dialog.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [MatDialogModule, ReactiveFormsModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})

export class GradeFilterDialog {
   private formBuilder = inject(FormBuilder);
   public dialogRef = inject<MatDialogRef<GradeFilterDialog>>(MatDialogRef<GradeFilterDialog>);

   public gradeFilters = inject<GradeFilter[]>(MAT_DIALOG_DATA);

   grades = eventGrades;

   gradeName = this.grades.map(grade => grade === "International" ? "Inter national" : grade);

   form = this.formBuilder.group({
      items: this.formBuilder.array(this.makeGradeFormControls())
   });

   makeGradeFormControls(): FormGroup[] {
      return this.gradeFilters.map(gradeFilter => this.createItemFormGroup(gradeFilter));
   }

   createItemFormGroup(grade: GradeFilter): FormGroup {
      return this.formBuilder.group({
         name: grade.name,
         enabled: grade.enabled, 
         distance: grade.distance, 
         time: grade.time,
      });
   }

   onSubmit() {
      const items = this.form.get('items') as FormArray;
      this.dialogRef.close(items.value as GradeFilter[]);
   }
}
