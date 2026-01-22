
import { NgStyle } from "@angular/common";
import { Component, effect, inject } from "@angular/core";
import { FormArray, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
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
import { AuthService } from 'app/auth/auth.service';
import { FixturesService } from "app/fixtures/@store/fixtures.service";
import { FormContainer } from "../../shared/components/form-container/form-container";
import { AppToolbar } from "../../shared/components/app-toolbar";
import { controlCardTypes } from '../@store/user';
import { UserDataService } from "../@store/user-data.service";

@Component({
  selector: 'app-user-edit-page',
  templateUrl: './user-edit-page.html',
  styleUrls: ['./user-edit-page.scss'],
  imports: [AppToolbar, FlexModule, ReactiveFormsModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, NgStyle, ExtendedModule, MatSelectModule, MatOptionModule, FormContainer]
})
export class UserEditPage {
  protected afAuth = inject(AuthService);
  private usd = inject(UserDataService);
  private fs = inject(FixturesService);
  private formBuilder = inject(NonNullableFormBuilder);
  private router = inject(Router);

  ecardTypes = controlCardTypes;

  error = "";

  showProgressBar = false;
  busy = false;

  protected userForm = this.formBuilder.group({
    firstname: [""],
    surname: [""],
    club: ["", [Validators.minLength(2), Validators.maxLength(10)]],
    postcode: [""],
    nationalId: [""],
    ecards: this.formBuilder.array([]) as FormArray
  });

  protected _ecardsControl(): FormArray {
    return this.userForm.controls['ecards'] as FormArray;
  }

  constructor() {

    effect(() => {
      const userData = this.usd.userdata();

      if (userData) {

        this.userForm.patchValue({
          firstname: userData.firstname,
          surname: userData.surname,
          club: userData.club,
          postcode: userData.postcode,
          nationalId: userData.nationalId,
        });

        for (const card of userData.ecards) {
            this._ecardsControl().push(this._createEcardControl(card.id, card.type));
        }
      }
    });

    // Navigate away if we aare logged out
    effect(() => {
      if (!this.afAuth.loggedIn()) {
        this.router.navigate(["/"]);
      }
    });
  }

  private _createEcardControl(id: string, type: string): FormGroup {
    return this.formBuilder.group({
      id: [id, [Validators.required, Validators.pattern("[0-9]+")]],
      type: [type, [Validators.required]]
    });
  }

  addEcard(): void {
    this._ecardsControl().push(this._createEcardControl('', ''));

    // Need to explicitly mark the form as diirty as removing an element in code does not mark it as dirty.
    this.userForm.markAsDirty();
  }

  removeEcard(i: number) {
    // remove address from the list
    this._ecardsControl().removeAt(i);

    // Need to explicitly mark the form as diirty as removing an element in code does not mark it as dirty.
    this.userForm.markAsDirty();

  }

  async save() {

    this.busy = true;
    try {
      // nationality is hard coded to GBR to simplify UI for the moment ng serve
      await this.usd.updateDetails({ ...this.userForm.value, nationality: 'GBR',  });
      console.log('UserComponnet: User results saved');
      this.fs.setPostcode(this.userForm.value.postcode!);

      this.userForm.reset();
      this.userForm.setControl('ecards', new FormArray<any>([]));

      this.router.navigate(["/"]);
    } finally {
      this.busy = false;
    }
  }

  canDeactivate(): boolean {
    return !this.userForm.dirty;
  }
}
