import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostcodeComponent } from "../../postcode.component";
import { FixturesService } from 'app/fixtures/fixtures.service';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule } from '@angular/material/legacy-form-field';

@Component({
    selector: 'app-postcode-dialog',
    standalone: true,
    templateUrl: './postcode-dialog.component.html',
    imports: [CommonModule, PostcodeComponent, MatDialogModule, MatButtonModule, MatLegacyFormFieldModule, MatLegacyInputModule, ReactiveFormsModule,]
})
export class PostcodeDialogComponent {

  constructor(private fs: FixturesService) {}
  
  postcodeFormControl: FormControl;
  postcode: string;

  ngOnInit() {
    this.postcodeFormControl = new FormControl<string>( "", [this.validatePostcode, Validators.required] );
  }

  postcodeEntered() {

    if ( !this.postcodeFormControl.valid ) {
      return;
    }
    const portcode = this.postcodeFormControl.value.trim().toUpperCase();
    if (portcode) {
      this.fs.setPostcode(portcode);
   }
  }

  validatePostcode( input: FormControl ) {
    const text = input.value.trim();

    if ( text === "" ) {
      return null;
    }
    const regex = /^[A-Z]{1,2}([0-9]{1,2}|[0-9][A-Z])\s*[0-9][A-Z]{2}$/gi;

    return regex.test( text ) ? null : { postcodeInvalid: true };
  }

}
