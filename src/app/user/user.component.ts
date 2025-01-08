
import { NgStyle } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { Auth, User, authState } from "@angular/fire/auth";
import { FormArray, FormBuilder, ReactiveFormsModule, UntypedFormArray, UntypedFormGroup, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSelectModule } from "@angular/material/select";
import { Router } from "@angular/router";
import { ExtendedModule } from "@ngbracket/ngx-layout/extended";
import { FlexModule } from "@ngbracket/ngx-layout/flex";
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FixturesService } from "app/fixtures/fixtures.service";
import { UserData, controlCardTypes } from "app/model";
import { Subscription } from 'rxjs';
import { FormContainerComponent } from "../shared/components/form-container/form-container.component";
import { ToolbarComponent } from "../shared/components/toolbar.component";
import { UserDataService } from "./user-data.service";

@UntilDestroy()
@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss"],
    imports: [ToolbarComponent, FlexModule, ReactiveFormsModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, NgStyle, ExtendedModule, MatSelectModule, MatOptionModule, FormContainerComponent]
})
export class UserComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private afAuth = inject(Auth);
  private router = inject(Router);
  private usd = inject(UserDataService);
  private fs = inject(FixturesService);

  originalUserData: UserData | null = null;
  ecardTypes = controlCardTypes;

  error = "";
  subscription!: Subscription;

  showProgressBar = false;
  busy = false;

   protected userForm = this.formBuilder.group({
        firstname: [""],
        surname: [""],
        club: ["", [Validators.minLength(2), Validators.maxLength(10)]],
        postcode: [""],
        nationalId: [""],
        yearOfBirth: [""],
        ecards: this.formBuilder.array([]) as UntypedFormArray
      });

  constructor () {}

  ngOnInit() {
    authState(this.afAuth)
      .pipe( untilDestroyed( this ) )
      .subscribe( loggedIn => this.loginChanged( loggedIn ) );

    this.usd.user$
      .pipe( untilDestroyed( this ) )
      .subscribe( userData => this.userChanged( userData ) );
  }

  protected _ecardsControl(): FormArray {
    return this.userForm.controls['ecards'] as FormArray;
  }

  loginChanged( loggedIn: User | null ) {
    if ( !loggedIn ) {
      this.router.navigate( ["/"] );
    }
  }

  private userChanged( userData: UserData | null) {
    this.originalUserData = userData;
    if ( userData ) {

      // Clear form by removing ecards and resetting
      this.userForm.setControl( 'ecards', new UntypedFormArray( [] ) );
      this.userForm.reset();

      this.userForm.setValue( {
        firstname: userData.firstname,
        surname: userData.surname,
        club: userData.club,
        yearOfBirth: userData.yearOfBirth.toString(),
        postcode: userData.postcode,
        nationalId: userData.nationalId,
        ecards: [],
      } );

      for ( const ecard of userData.ecards ) {
        this._ecardsControl().push( this._createEcard( ecard.id, ecard.type ) );
      }
    }
  }

  private _createEcard( id: string, type: string ): UntypedFormGroup {
    return this.formBuilder.group( {
      id: [id, [Validators.required, Validators.pattern( "[0-9]+" )]],
      type: [type, [Validators.required]]
    } );
  }

  addEcard(): void {
    this._ecardsControl().push( this._createEcard( '', '' ) );

    // Need to explicitly mark the form as diirty as removing an element in code does not mark it as dirty.
    this.userForm.markAsDirty();
  }

  removeEcard( i: number ) {
    // remove address from the list
    this._ecardsControl().removeAt( i );

    // Need to explicitly mark the form as diirty as removing an element in code does not mark it as dirty.
    this.userForm.markAsDirty();

  }

  async save() {
    
    this.busy = true;
    try {
      // nationality id hard coded to GBR to simplify UI for the moment ng serve
      await this.usd.updateDetails( { ...this.userForm.getRawValue, nationality: 'GBR' } );
      console.log( 'UserComponnet: User results saved' );
      this.fs.setPostcode( this.userForm.value.postcode! );  
    } finally {
      this.busy = false;
      this.router.navigate( ["/"] );
    }
  }

  canDeactivate(): boolean {
    return !this.userForm.dirty;
  }
}
