import { Component, inject } from '@angular/core';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { FormContainer } from "../../shared/components/form-container/form-container";
import { AppToolbar } from "../../shared/components/app-toolbar";

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss'],
  imports: [FlexModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, FormContainer, AppToolbar]
})
export class RecoverComponent {
  private router = inject(Router);
  private formBuilder = inject(NonNullableFormBuilder);
  private afAuth = inject(Auth);
  private snackBar = inject(MatSnackBar);

  recoverForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  async recover() {
    const emailAddress = this.recoverForm.value.email!;

    try {
      await sendPasswordResetEmail(this.afAuth, emailAddress);
      this.router.navigate(["/auth/login"]);
    } catch (err) {
      console.log('RecoverComponent: Error requesting password reset for email');
      this.snackBar.open('Error requesting password reset for email', 'Close', { duration: 3000 });
    }
  }
}
