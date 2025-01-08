import { Component, Input, OnInit, output } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { UntypedFormControl, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { FixtureFilter, FixtureTimeFilter } from 'app/model/fixture-filter';
import { LoginSnackbarService } from 'app/shared/services/login-snackbar.service';
import { GradeFilterComponent } from '../grade-filter-dialog/grade-filter-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FixtureWeekFilterComponent } from './fixture-week-filter.component';
import { ExtendedModule } from '@ngbracket/ngx-layout/extended';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { input } from "@angular/core";

@UntilDestroy( { checkProperties: true } )
@Component({
    selector: 'app-fixtures-options',
    templateUrl: './fixtures-options.component.html',
    styleUrls: ['./fixtures-options.component.scss'],
    imports: [FlexModule, MatButtonToggleModule, MatIconModule, NgClass, ExtendedModule, FixtureWeekFilterComponent, MatButtonModule, MatSlideToggleModule, ReactiveFormsModule]
})
export class FixturesOptionsComponent implements OnInit {

   outputFilter!: FixtureFilter;

   @Input({required: true})
   set filter( f: FixtureFilter ) {
      this.outputFilter = Object.assign( f );
   }

   filterChanged = output<FixtureFilter>();

   gradesEnabledControl = new FormControl(true);

   constructor ( private dialog: MatDialog,
      private auth: Auth,
      private loginSnackBar: LoginSnackbarService ) { }

   ngOnInit() {
      this.gradesEnabledControl.setValue( this.outputFilter.gradesEnabled );

      this.gradesEnabledControl.valueChanges.subscribe( ( val ) => {
         this.outputFilter.gradesEnabled = val!;
         this.filterChanged.emit( this.outputFilter );
      } );
   }

   async likeClicked( event: MatButtonToggleChange ) {
      if ( ! (await this.auth.currentUser) ) {
         this.loginSnackBar.open( "Must be logged in to filter liked events" );
         return;
      }
      this.outputFilter.likedOnly = event.source.checked;
      this.filterChanged.emit( this.outputFilter );
   }

   timeFilterChanged( val: FixtureTimeFilter ) {
      this.outputFilter.time = val;
      this.filterChanged.emit( this.outputFilter );
   }

   displayGrades() {
      // Display grade dialog

      const dialogRef = this.dialog.open( GradeFilterComponent, {
         width: '320px',
         maxWidth: '100vw',
         maxHeight: '100vh',
         data: this.outputFilter.grades,
         panelClass: 'sb-highzorder-dialog'
      } );

      dialogRef.afterClosed().subscribe( gradeFilter => {
         if ( gradeFilter ) {
            this.outputFilter.grades = gradeFilter;
            this.filterChanged.emit( this.outputFilter );
         }
      } );
   }
}
