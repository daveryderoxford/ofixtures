import { Component, OnInit, inject } from '@angular/core';
import { Auth, FacebookAuthProvider, GoogleAuthProvider, UserCredential, getRedirectResult, 
         signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from '@angular/fire/auth';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { ToolbarComponent } from '../../shared/components/toolbar.component';

export type AuthProvider = "EmailAndPassword" | "Google" | "Facebook";

const facebookAuthProvider = new FacebookAuthProvider();
const googleAuthProvider = new GoogleAuthProvider();

 const isInStandaloneMode = () =>
   ( window.matchMedia( '(display-mode: standalone)' ).matches ) ||
   ( ( window.navigator as any ).standalone ) ||
   document.referrer.includes( 'android-app://' )

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [ToolbarComponent, FlexModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink]
})
export class LoginComponent implements OnInit {
   private route = inject(ActivatedRoute);
   private router = inject(Router);
   private formBuilder = inject(UntypedFormBuilder);
   private afAuth = inject(Auth);

   loginForm: UntypedFormGroup;
   error: string;
   loading = false;
   returnUrl: string;

   ngOnInit() {
      this.route.queryParams.subscribe( params => {
         this.returnUrl = params[ 'returnUrl' ];
      } );

      this.loginForm = this.formBuilder.group({
         email: ['', [Validators.required, Validators.email]],
         password: ['', Validators.required]
      });

      this.error = '';
   }

   async loginFormSubmit() {
      if (this.loginForm.valid) {
         await this.signInWith("EmailAndPassword", this.loginForm.value);
      }
   }

   async signInWith(provider: AuthProvider, credentials?: {email: string, password: string} ) {

      let userCredentials: UserCredential;

      try {
         this.loading = true;
         this.error = '';

         switch (provider) {

            case "EmailAndPassword":
               userCredentials = await signInWithEmailAndPassword( this.afAuth, credentials.email, credentials.password );
               break;

            case "Google":
               userCredentials = await this._thirdPartySignIn(googleAuthProvider);
               break;

            case "Facebook":
               userCredentials = await this._thirdPartySignIn(facebookAuthProvider);
               break;
         }
         this._handleSignInSuccess();
      } catch (err) {
         this._handleSigninError(err);
      } finally {
         this.loading = false;
      }
   }

   /** Sign in with redirect for PWA and popup for browser.
    * Sign in with popup avoids re-loading the application on the browser.
    * TODO Review which method is better for mobile devices where popups are not handled as well
   */
   private async _thirdPartySignIn( provider ): Promise<UserCredential> {
      if (isInStandaloneMode()) {
         await signInWithRedirect(this.afAuth, provider);
         const result = await getRedirectResult( this.afAuth );
         if ( result === null || provider.credentialFromResult( result ) === null ) {
            return null;
         }
         return result;
      } else {
         return await signInWithPopup (this.afAuth, provider);
      }
   }

   private _handleSigninError(err: any) {
      console.log('LoginComponent: Error loging in.  Error code:' + + err.code + '  ' + err.message);
      this.error = 'Login attempt failed';
   }

   private _handleSignInSuccess() {
      console.log('LoginComponent: Successful login');
      this.error = '';
      this.router.navigateByUrl(this.returnUrl);
   }
}
