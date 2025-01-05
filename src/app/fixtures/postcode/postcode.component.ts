import { ChangeDetectionStrategy, Component, Input, OnInit, output } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { input } from "@angular/core";

@Component({
    selector: 'app-postcode',
    templateUrl: './postcode.component.html',
    styleUrls: ['./postcode.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule]
})
export class PostcodeComponent implements OnInit {
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
