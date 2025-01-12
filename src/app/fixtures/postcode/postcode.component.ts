import { ChangeDetectionStrategy, Component, effect, Input, OnInit, output } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { input } from "@angular/core";
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-postcode',
    templateUrl: './postcode.component.html',
    styleUrls: ['./postcode.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatCardModule]
})
export class PostcodeComponent {
  postcode = input.required<string>();
  postcodeChanged = output<string>();

  postcodeFormControl = new FormControl("TW18 2AB", [this.validatePostcode, Validators.required]);

  constructor() {
    effect( () => {
      this.postcodeFormControl.setValue(this.postcode());
    })
  }

  postcodeEntered() {

    if (!this.postcodeFormControl.valid || !this.postcodeFormControl.value) {
      return;
    }
    const postcode = this.postcodeFormControl.value.trim().toUpperCase();
    this.postcodeChanged.emit( postcode );
  }

  validatePostcode( input: FormControl ): { [key: string]: boolean } | null {
    const text = input.value.trim();

    if ( text === "" ) {
      return null;
    }
    const regex = /^[A-Z]{1,2}([0-9]{1,2}|[0-9][A-Z])\s*[0-9][A-Z]{2}$/gi;

    return regex.test( text ) ? null : { postcodeInvalid: true };
  }
}
