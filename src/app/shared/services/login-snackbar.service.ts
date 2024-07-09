import { Injectable, inject } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginSnackbarService {
      private snackbar = inject(MatSnackBar);
      private router = inject(Router);
  target: string;

  open(message: string, target?: string) {
    const snackBarRef = this.snackbar.open( message, "Login", { duration: 3000 });

    snackBarRef.onAction().subscribe( () => {
       this.router.navigate(["/auth/login"]);
       this.target = target;
    } );
  }
}
