import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FixturesService } from 'app/fixtures/fixtures.service';

@Component({
  selector: 'app-postcode-dialog',
  templateUrl: './postcode-dialog.component.html',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule]
})
export class PostcodeDialogComponent {
  private fs = inject(FixturesService);

  postcode: string = "";

  postcodeFormControl = new FormControl("", [this.validatePostcode, Validators.required]);

  postcodeEntered() {

    if (!this.postcodeFormControl.valid || !this.postcodeFormControl.value) {
      return;
    }
    const portcode = this.postcodeFormControl.value.trim().toUpperCase();
    if (portcode) {
      this.fs.setPostcode(portcode);
    }
  }

  validatePostcode(input: FormControl): { [key: string]: boolean; } | null {
    const text = input.value.trim();

    if (text === "") {
      return null;
    }
    const regex = /^[A-Z]{1,2}([0-9]{1,2}|[0-9][A-Z])\s*[0-9][A-Z]{2}$/gi;

    return regex.test(text) ? null : { postcodeInvalid: true };
  }

}
