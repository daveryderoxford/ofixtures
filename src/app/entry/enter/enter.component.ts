import { Component, OnInit, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Entry, EntryCourse, FixtureEntryDetails } from 'app/entry/@store/entry';
import { UserDataService } from 'app/user/@store/user-data.service';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { EntryService } from '../@store/entry.service';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { ToolbarComponent } from '../../shared/components/toolbar.component';
import { FormContainerComponent } from "../../shared/components/form-container/form-container.component";
import { UserData } from 'app/user/@store/user';

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
   imports: [
    ToolbarComponent,
    FlexModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    FormContainerComponent
]
})
export class EnterComponent implements OnInit {
   private route = inject(ActivatedRoute);
   private router = inject(Router);
   private formBuilder = inject(UntypedFormBuilder);
   private snackbar = inject(MatSnackBar);
   private es = inject(EntryService);
   private usd = inject(UserDataService);

   form!: UntypedFormGroup;

   fixtureId = '';
   id = '';
   entry!: Entry;
   fixture!: FixtureEntryDetails;
   user!: UserData;
   busy = false;

   ngOnInit() {

      this.route.paramMap.subscribe((params: ParamMap) => {
         this.fixtureId = params.get('fixtureId')!;
         this.id = params.get('entryId')!;

         // Read event details (for courses)

         const fixture$ = this.es.getEntryDetails(this.fixtureId);

         if (!this.id) {
            fixture$.pipe(untilDestroyed(this)).subscribe(fix => {
               if (!fix) {
                  return
               }
               this.fixture = fix;

               const user = this.usd.userdata();
               if (user) {
                  this._createForm({
                     firstname: user.firstname,
                     surname: user.surname,
                     club: user.club,
                     course: ""
                  });
               } else {
                  this._createForm({});
               }
            });
         } else {
            const entry$ = this.es.getEntry$(this.fixtureId, this.id).pipe(take(1));
            forkJoin([fixture$, entry$]).pipe(untilDestroyed(this)).subscribe(([fix, entry]) => {
               if ( fix && entry) {
                  this.fixture = fix;
                  this._createForm(entry);
               }
            });
         }
      });
   }

   private _createForm(data: FormData) {
      this.form = this.formBuilder.group({
         firstname: [data.firstname, Validators.required],
         surname: [data.surname, Validators.required],
         club: [data.club, [Validators.minLength(2), Validators.maxLength(10)]],
         course: [data.course, Validators.required]
      });
   }

   async onSubmit() {

      // Check entry limit

      this.busy = true;

      try {

         if (!this.id) {
            await this.es.enter(this.fixture, this.form.value);
         } else {
            await this.es.updateEntry(this.fixtureId, this.id, this.form.value);
         }
         this.snackbar.open("Entry Saved", "", { duration: 2000 });
         this.form.reset();
      } catch (err) {
         this.snackbar.open("Error Saving Entry", "", { duration: 2000 });
      } finally {
         this.busy = false;
      }
   }

   numMapValidator(control: UntypedFormControl) {
      const course: EntryCourse = (this.fixture.courses.find(control.value)!);
      if (course.reservedMaps < course.maxMaps) {
         return null;
      } else {
         return { 'maxMapsExceeded': true };
      }
   }

   canDeactivate(): boolean {
      return !this.form.dirty;
   }
}
