import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserData } from 'app/model';
import { Entry, EntryCourse, FixtureEntryDetails } from 'app/model/entry';
import { UserDataService } from 'app/user/user-data.service';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { EntryService } from '../entry.service';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { MatLegacyOptionModule } from '@angular/material/legacy-core';
import { MatLegacySelectModule } from '@angular/material/legacy-select';
import { MatLegacyInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule } from '@angular/material/legacy-form-field';
import { NgIf, NgFor } from '@angular/common';
import { MatLegacyCardModule } from '@angular/material/legacy-card';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { ToolbarComponent } from '../../shared/components/toolbar.component';

interface FormData {
   firstname?: string;
   surname?: string;
   club?: string;
   course?: string;
}

@UntilDestroy()
@Component({
    selector: 'app-enter',
    templateUrl: './enter.component.html',
    styleUrls: ['./enter.component.scss'],
    standalone: true,
    imports: [
        ToolbarComponent,
        FlexModule,
        MatLegacyCardModule,
        NgIf,
        ReactiveFormsModule,
        MatLegacyFormFieldModule,
        MatLegacyInputModule,
        MatLegacySelectModule,
        MatLegacyOptionModule,
        NgFor,
        MatLegacyButtonModule,
    ],
})
export class EnterComponent implements OnInit {

   form: UntypedFormGroup;

   fixtureId: string;
   id: string;
   entry: Entry;
   fixture: FixtureEntryDetails;
   user: UserData;
   busy = false;

   constructor ( private route: ActivatedRoute,
      private router: Router,
      private formBuilder: UntypedFormBuilder,
      private snackbar: MatSnackBar,
      private es: EntryService,
      private usd: UserDataService ) { }

   ngOnInit() {

      this.route.paramMap.subscribe( ( params: ParamMap ) => {
         this.fixtureId = params.get( 'fixtureId' );
         this.id = params.get( 'entryId' );

         // Read event details (for courses)

         const fixture$ = this.es.getEntryDetails( this.fixtureId );

         if ( !this.id ) {
            fixture$.pipe(untilDestroyed(this)).subscribe( fix => {
               this.fixture = fix;

               if ( this.usd.currentUserData ) {
                  const user = this.usd.currentUserData;
                  this._createForm( {
                     firstname: user.firstname,
                     surname: user.surname,
                     club: user.club,
                     course: ""
                  } );
               } else {
                  this._createForm( {} );
               }
            } );
         } else {
            const entry$ = this.es.getEntry$( this.fixtureId, this.id ).pipe( take( 1 ) );
            forkJoin( [fixture$, entry$] ).pipe( untilDestroyed( this ) ).subscribe( ( [fix, entry] ) => {
               this.fixture = fix;
               this._createForm( entry );
            } );
         }
      } );
   }

   private _createForm( data: FormData | null ) {
      this.form = this.formBuilder.group( {
         firstname: [data.firstname, Validators.required],
         surname: [data.surname, Validators.required],
         club: [data.club, [Validators.minLength( 2 ), Validators.maxLength( 10 )]],
         course: [data.course, Validators.required]
      } );
   }

   async onSubmit() {

      // Check entry limit

      this.busy = true;

      try {

         if ( !this.id ) {
            await this.es.enter( this.fixture, this.form.value );
         } else {
            await this.es.updateEntry( this.fixtureId, this.id, this.form.value );
         }
         this.snackbar.open( "Entry Saved", "", { duration: 2000 });
         this.form.reset();
      } catch ( err ) {
         this.snackbar.open( "Error Saving Entry", "", { duration: 2000 } );
      } finally {
         this.busy = false;
      }
   }

   numMapValidator( control: UntypedFormControl ) {
      const course: EntryCourse = ( this.fixture.courses.find( control.value ) );
      if ( course.reservedMaps < course.maxMaps ) {
         return null;
      } else {
         return { 'maxMapsExceeded': true };
      }
   }

   canDeactivate(): boolean {
      return !this.form.dirty;
   }
}
