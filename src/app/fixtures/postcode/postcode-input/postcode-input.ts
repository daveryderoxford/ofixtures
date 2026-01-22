import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { debounceTime, tap } from 'rxjs';

@Component({
   selector: 'app-postcode-input',
   templateUrl: './postcode-input.html',
   styleUrls: ['./postcode-input.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatIconModule, MatSnackBarModule]
})
export class PostcodeInput {
   snackbar = inject(MatSnackBar);

   postcode = input.required<string>();
   postcodeChanged = output<string>();

   postcodeFormControl = new FormControl("TW18 2AB", [this.validatePostcode, Validators.required]);

   constructor() {
      effect(() => {
         this.postcodeFormControl.setValue(this.postcode());
      });

      this.postcodeFormControl.valueChanges.pipe(
         takeUntilDestroyed(),
         debounceTime(500),
         tap((value) => this.postcodeEntered(value))
      ).subscribe();

   }

   postcodeEntered(value: string | null) {

      if (!this.postcodeFormControl.valid || !value) {
         return;
      }
      const postcode = value.trim().toUpperCase();
      this.postcodeChanged.emit(postcode);
   }

   validatePostcode(input: FormControl): { [key: string]: boolean; } | null {
      const text = input.value.trim();

      if (text === "") {
         return null;
      }
      const regex = /^[A-Z]{1,2}([0-9]{1,2}|[0-9][A-Z])\s*[0-9][A-Z]{2}$/gi;

      return regex.test(text) ? null : { postcodeInvalid: true };
   }

   leave() {
      if (!this.postcodeFormControl.valid || !this.postcodeFormControl.value) {
         this.snackbar.open('Postcode not set as it in invalid', 'Close', { duration: 2 * 1000 });
         this.postcodeFormControl.setValue(this.postcode());
      }
   }
}
