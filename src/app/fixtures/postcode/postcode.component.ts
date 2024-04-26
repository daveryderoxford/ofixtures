import { ChangeDetectionStrategy, Component, Input, OnInit, output } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule } from '@angular/material/legacy-form-field';
import { input } from "@angular/core";

@Component({
    selector: 'app-postcode',
    templateUrl: './postcode.component.html',
    styleUrls: ['./postcode.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatLegacyFormFieldModule, MatLegacyInputModule, ReactiveFormsModule, MatLegacyButtonModule]
})
export class PostcodeComponent implements OnInit {

  constructor() { }

  postcode = input<string>();
  postcodeChanged = output<string>();

  postcodeFormControl: FormControl;

  ngOnInit() {
    this.postcodeFormControl = new FormControl<string>( this.postcode(), [this.validatePostcode, Validators.required] );
  }

  postcodeEntered() {

    if ( !this.postcodeFormControl.valid ) {
      return;
    }
    const portcode = this.postcodeFormControl.value.trim().toUpperCase();
    this.postcodeChanged.emit( portcode );
  }

  validatePostcode( input: FormControl ) {
    const text = input.value.trim();

    if ( text === "" ) {
      return null;
    }
    const regex = /^[A-Z]{1,2}([0-9]{1,2}|[0-9][A-Z])\s*[0-9][A-Z]{2}$/gi;

    return regex.test( text ) ? null : { postcodeInvalid: true };
  }

;
;
}
