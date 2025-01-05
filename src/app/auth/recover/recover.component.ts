import { Component, OnInit, inject } from '@angular/core';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { ToolbarComponent } from '../../shared/components/toolbar.component';

@Component({
    selector: 'app-recover',
    templateUrl: './recover.component.html',
    styleUrls: ['./recover.component.scss'],
    imports: [ToolbarComponent, FlexModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink]
})
export class RecoverComponent implements OnInit {
      private router = inject(Router);
      private formBuilder = inject(UntypedFormBuilder);
      private afAuth = inject(Auth);
      private snackBar = inject(MatSnackBar);
  recoverForm: UntypedFormGroup;
  error: string;

  ngOnInit() {
    this.recoverForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async recover() {
    const emailAddress = this.recoverForm.get('email').value;

    try {
      await sendPasswordResetEmail(this.afAuth, emailAddress );
      this.router.navigate( ["/auth/login"]);
    } catch (err) {
      console.log('RecoverComponent: Error requesting password reset for email');
      this.snackBar.open( 'Error requesting password reset for email', 'Close' , {duration: 3000});
    }
  }
}
