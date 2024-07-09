import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification } from '@angular/fire/auth';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';

import { MatLegacyInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyCardModule } from '@angular/material/legacy-card';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { ToolbarComponent } from '../../shared/components/toolbar.component';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    standalone: true,
    imports: [ToolbarComponent, FlexModule, MatLegacyCardModule, ReactiveFormsModule, MatLegacyFormFieldModule, MatLegacyInputModule, MatLegacyButtonModule, RouterLink]
})
export class SignupComponent {
      private router = inject(Router);
      private formBuilder = inject(UntypedFormBuilder);
      private afAuth = inject(Auth);
    signupForm: UntypedFormGroup;
    error = '';

    constructor() {
        this.signupForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        }, { validator: this.passwordMissMatch } );

    }

    passwordMissMatch(g: UntypedFormGroup): any {
        const p1 = g.get('password');
        const p2 = g.get('confirmPassword');
        let ret: {[error: string]: any} = {};

       if ( (p1.touched || p2.touched) &&
            (p1.value !== p2.value)  &&
            (p2 !== null) ) {
            ret = { passwordMissMatch: true };
        }

        return (ret);
    }

    async signup() {

        const email = this.signupForm.get('email').value;
        const password = this.signupForm.get('password').value;

        this.error = '';

        try {
            await createUserWithEmailAndPassword(this.afAuth, email, password);

            // User is automatically signed in so get the current user and send verification email
            const user = await this.afAuth.currentUser;
            sendEmailVerification(user);

            this.router.navigateByUrl('/user');

        } catch (error) {
            console.log('SignupComponent: Error creating user code:' + error.code + '  ' + error.message);
            this.error = error.message;
        }
    }
}
