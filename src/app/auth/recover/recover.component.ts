import { Component, OnInit } from '@angular/core';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Router, RouterLink } from '@angular/router';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyCardModule } from '@angular/material/legacy-card';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { ToolbarComponent } from '../../shared/components/toolbar.component';

@Component({
    selector: 'app-recover',
    templateUrl: './recover.component.html',
    styleUrls: ['./recover.component.scss'],
    standalone: true,
    imports: [ToolbarComponent, FlexModule, MatLegacyCardModule, ReactiveFormsModule, MatLegacyFormFieldModule, MatLegacyInputModule, MatLegacyButtonModule, RouterLink]
})
export class RecoverComponent implements OnInit {
  recoverForm: UntypedFormGroup;
  error: string;

  constructor(private router: Router,
    private formBuilder: UntypedFormBuilder,
    private afAuth: Auth, 
    private snackBar: MatSnackBar
  ) { }

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
