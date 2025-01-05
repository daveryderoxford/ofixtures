
import { Component, OnInit } from "@angular/core";
import { Auth, User, authState } from "@angular/fire/auth";
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FixturesService } from "app/fixtures/fixtures.service";
import { controlCardTypes, UserData } from "app/model";
import { Subscription } from 'rxjs';
import { UserDataService } from "./user-data.service";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { ExtendedModule } from "@ngbracket/ngx-layout/extended";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { NgStyle } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { FlexModule } from "@ngbracket/ngx-layout/flex";
import { ToolbarComponent } from "../shared/components/toolbar.component";

@UntilDestroy()
@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss"],
    imports: [ToolbarComponent, FlexModule, MatCardModule, ReactiveFormsModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, NgStyle, ExtendedModule, MatSelectModule, MatOptionModule]
})
export class UserComponent implements OnInit {
  originalUserData: UserData = null;
  userForm: UntypedFormGroup;
  ecardTypes = controlCardTypes;

  error = "";
  subscription: Subscription;

  showProgressBar = false;
  busy = false;

  cardclass: "mat-card-mobile";

  constructor (
    private formBuilder: UntypedFormBuilder,
    private afAuth: Auth,
    private router: Router,
    private usd: UserDataService,
    private fs: FixturesService,
  ) {
    this.userForm = this.formBuilder.group( {
      firstname: [""],
      surname: [""],
      club: ["", [Validators.minLength( 2 ), Validators.maxLength( 10 )]],
      postcode: [""],
      nationalId: [""],
      yearOfBirth: [""],
      ecards: this.formBuilder.array( [] ) as UntypedFormArray
    } );
  }

  ngOnInit() {
    authState(this.afAuth)
      .pipe( untilDestroyed( this ) )
      .subscribe( loggedIn => this.loginChanged( loggedIn ) );

    this.usd.user$
      .pipe( untilDestroyed( this ) )
      .subscribe( userData => this.userChanged( userData ) );
  }

  private _ecardsControl(): UntypedFormArray {
    return this.userForm.controls['ecards'] as UntypedFormArray;
  }

  loginChanged( loggedIn: User ) {
    if ( !loggedIn ) {
      this.router.navigate( ["/"] );
    }
  }

  private userChanged( userData: UserData ) {
    this.originalUserData = userData;
    if ( userData ) {

      // Clear form by removing ecards and resetting
      this.userForm.setControl( 'ecards', new UntypedFormArray( [] ) );
      this.userForm.reset();

      this.userForm.setValue( {
        firstname: userData.firstname,
        surname: userData.surname,
        club: userData.club,
        yearOfBirth: userData.yearOfBirth,
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

  ecardControls() {
    return this.userForm.get( 'ecards' )['controls'];
  }

  async save() {

    const updatedUserData: UserData = null;

    this.busy = true;
    try {
      // nationality id hard coded to GBR to simplify UI for the moment ng serve
      await this.usd.updateDetails( { ...this.userForm.value, nationality: 'GBR' } );
      console.log( 'UserComponnet: User results saved' );
      this.fs.setPostcode( this.userForm.value.postcode );
    } finally {
      this.busy = false;
      this.router.navigate( ["/"] );
    }
  }

  canDeactivate(): boolean {
    return !this.userForm.dirty;
  }
}
