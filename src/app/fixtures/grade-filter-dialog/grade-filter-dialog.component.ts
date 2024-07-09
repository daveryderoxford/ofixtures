import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogModule } from '@angular/material/legacy-dialog';
import { eventGrades } from 'app/model';
import { GradeFilter } from 'app/model/fixture-filter';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyCheckboxModule } from '@angular/material/legacy-checkbox';


@Component({
    selector: 'app-filter',
    templateUrl: './grade-filter-dialog.component.html',
    styleUrls: ['./grade-filter-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatLegacyDialogModule, ReactiveFormsModule, MatLegacyCheckboxModule, MatLegacyFormFieldModule, MatLegacyInputModule, MatLegacyButtonModule]
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
