/** Edit  map reservation details from the database
 *  Takes fixture id as a route parameter.
 *  Uses EntryService to create FixtureEntryDetails for the fixture of they do not already exist
*/
import { DatePipe, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ExtendedModule } from '@ngbracket/ngx-layout/extended';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { UntilDestroy } from '@ngneat/until-destroy';
import { EntryCourse, FixtureEntryDetails } from 'app/entry/@store/entry';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { EntryService } from '../../../entry/@store/entry.service';
import { ToolbarComponent } from '../../../shared/components/toolbar.component';
import { EllipsisPipe } from '../../../shared/pipes/ellipsis-pipe';
import { FixtureSelectComponent } from '../../fixture-select/fixture-select.component';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { Fixture } from 'app/fixtures/@store/fixture';

@UntilDestroy({ checkProperties: true })
@Component({
   selector: 'app-map-registration-admin',
   templateUrl: './map-registration-admin.component.html',
   styleUrls: ['./map-registration-admin.component.scss'],
   imports: [
      ToolbarComponent,
      FlexModule,
      MatCardModule,
      ReactiveFormsModule,
      MatDividerModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatDatepickerModule,
      MatIconModule,
      NgStyle,
      ExtendedModule,
      MatChipsModule,
      DatePipe,
      EllipsisPipe
   ],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapRegistrationAdminComponent implements OnInit {
   private route = inject(ActivatedRoute);
   private router = inject(Router);
   private formBuilder = inject(UntypedFormBuilder);
   private dialog = inject(MatDialog);
   private snackbar = inject(MatSnackBar);
   private es = inject(EntryService);
   form!: UntypedFormGroup;
   coursesChanged = signal(false);
   readonly minDate = new Date();

   // Edit date
   courses!: EntryCourse[];
   id!: string;
   new = false;
   fixture?: Fixture;
   busy = false;

   ngOnInit() {

      this.route.paramMap.subscribe((params: ParamMap) => {
         this.id = params.get('id')!;
         this.new = params.has('new')!;

         if (params.has('fixture')) {
            this.fixture = JSON.parse(params.get('fixture')!);
         }

         if (this.new) {
            this._createForm({ closingDate: new Date().toISOString() });
            this.courses = [];
         } else {
            this.es.getEntryDetails(this.id).pipe(take(1))
               .subscribe(details => {
                  if (details) {
                     this._createForm(details);
                     this.courses = JSON.parse(JSON.stringify(details.courses));
                  }
               });
         }
      });
   }

   private _createForm(data: any) {
      this.form = this.formBuilder.group({
         closingDate: [data.closingDate, [Validators.required]],
      });
   }

   selectFixture() {
      this._displayFixtureSelectDialog().subscribe(f => {
         this.fixture = f[0];
      });
   }

   private _displayFixtureSelectDialog(): Observable<Fixture[]> {

      const dialogRef = this.dialog.open(FixtureSelectComponent, {
         width: '350px',
         maxWidth: '100vw',
         //  maxHeight: '100vh',
         data: { multiselect: false, initialFilter: "", selectedIds: [] },
      });

      return dialogRef.afterClosed();
   }

   /** Add Course via dialog */
   addCourse() {
      const course: EntryCourse = {
         name: "",
         maxMaps: 0,
         reservedMaps: 0,
      };

      this._displayCourseDialog(course).subscribe(c => {
         if (c) {
            this.courses.push(c);
            this.coursesChanged.set(true);
         }
      });
   }

   removeCourse(course: EntryCourse) {
      const index = this.courses.indexOf(course);

      if (index >= 0) {
         this.courses.splice(index, 1);
         this.coursesChanged.set(true);
      }
   }

   editCourse(course: EntryCourse, index: number) {
      this._displayCourseDialog(course).subscribe(c => {
         if (c) {
            this.courses[index] = c;
            this.coursesChanged.set(true);
         }
      });
   }

   private _displayCourseDialog(course: EntryCourse): Observable<EntryCourse> {

      const dialogRef = this.dialog.open(CourseDialogComponent, {
         width: '250px',
         maxWidth: '100vw',
         maxHeight: '100vh',
         data: { hasAgeClasses: false, course: course },
      });

      return dialogRef.afterClosed();
   }

   /** Returns array of duplicate course names */
   private _duplicateCourseNames(courses: EntryCourse[]): string[] {
      const names = courses.map((course => course.name));
      const duplicateNames = names.filter((name, index) => names.indexOf(name) !== index);
      return duplicateNames;
   }

   async onSubmit() {

      if (this.courses.length === 0) {
         this.snackbar.open("Error - At least one course must be defined", "", { duration: 2000 });
         return;
      }

      if (this._duplicateCourseNames(this.courses).length !== 0) {
         this.snackbar.open("Error - Course names must be unique", "", { duration: 2000 });
         return;
      }

      // TODO Make the control return an ISO string
      // Temp workaround
      const closingDate = new Date(this.form.get('closingDate')!.value).toISOString();

      this.busy = true;

      try {

         if (this.new && this.fixture) {
            // Create new instance and save it
            const details = this.es.createNewEntryDetails(this.fixture.id, this.fixture);
            details.closingDate = closingDate;
            details.courses = this.courses;
            await this.es.saveNewEntryDetails(details);
         } else {
            const update: Partial<FixtureEntryDetails> = {
               closingDate: closingDate,
               courses: this.courses
            };
            await this.es.updateEntryDetails(this.id, update);
         }
         this.snackbar.open("Map registration enabled for event", "", { duration: 2000 });
         await this.router.navigateByUrl("/admim");


      } catch (err) {
         this.snackbar.open("Error enabling map registration", "", { duration: 2000 });
      } finally {
         this.busy = false;
      }
   }

   canDeactivate(): boolean {
      return !this.form.dirty;
   }
}
