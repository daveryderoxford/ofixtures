import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { eventGrades } from 'app/model';
import { GradeFilter } from 'app/model/fixture-filter';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
    selector: 'app-filter',
    templateUrl: './grade-filter-dialog.component.html',
    styleUrls: ['./grade-filter-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatDialogModule, ReactiveFormsModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})

export class GradeFilterComponent implements OnInit {
      private formBuilder = inject(UntypedFormBuilder);
      public dialogRef = inject<MatDialogRef<GradeFilterComponent>>(MatDialogRef<GradeFilterComponent>);
      public data = inject<GradeFilter[]>(MAT_DIALOG_DATA);
   grades = eventGrades;

   form: UntypedFormGroup;
   items: UntypedFormArray;

   ngOnInit() {
      this.form = this.formBuilder.group({
         items: this.formBuilder.array([])
      });

      this.items = this.form.get('items') as UntypedFormArray;

      for (const gradeItem of this.data) {
         this.items.push(this.createItem(gradeItem));
      }
   }

   createItem(grade: GradeFilter): UntypedFormGroup {
      return this.formBuilder.group({
         name: grade.name,
         enabled: grade.enabled,
         distance: grade.distance,
         time: grade.time
      });
   }

   onSubmit() {
      const grades = this.items.value;
      this.dialogRef.close(grades);
   }

}
