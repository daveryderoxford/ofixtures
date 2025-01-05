import { Component, inject } from '@angular/core';
import { Auth, updatePassword } from '@angular/fire/auth';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { ToolbarComponent } from '../../shared/components/toolbar.component';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    imports: [ToolbarComponent, FlexModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class ChangePasswordComponent {
      private router = inject(Router);
      private formBuilder = inject(UntypedFormBuilder);
      private afAuth = inject(Auth);
  form: UntypedFormGroup;
  error = '';

  constructor() {
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMissMatch });

  }

  passwordMissMatch(g: UntypedFormGroup): any {
    const p1 = g.get('password');
    const p2 = g.get('confirmPassword');
    let ret: { [error: string]: any } = {};

    if ((p1.touched || p2.touched) &&
      (p1.value !== p2.value) &&
      (p2 !== null)) {
      ret = { passwordMissMatch: true };
    }

    return (ret);
  }

  async changePassword() {

    const user = await this.afAuth.currentUser;
    const password = this.form.get('password').value;

    this.error = '';

    try {
      await updatePassword(user, password);
      this.router.navigateByUrl('/');

    } catch (error) {
      console.log('SignupComponent: Error updating password:' + error.code + '  ' + error.message);
      this.error = 'Error updating password';
    }
  }
}
