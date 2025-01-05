import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EntryService } from 'app/entry/entry.service';
import { Entry, EntryCourse, FixtureDetailsAndEntries } from 'app/model/entry';
import { map, switchMap } from 'rxjs/operators';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { DatePipe } from '@angular/common';
import { ToolbarComponent } from '../../shared/components/toolbar.component';

/** Display all the entries for a fixture */
@UntilDestroy()
@Component({
    selector: 'app-entry-list',
    templateUrl: './entry-list.component.html',
    styleUrls: ['./entry-list.component.scss'],
    imports: [
        ToolbarComponent,
        FlexModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        SpinnerComponent,
        DatePipe
    ]
})
export class EntryListComponent implements OnInit {

   fixture: FixtureDetailsAndEntries;
   entries: Entry[];

   displayedColumns = ["id", "name", "club", "class", ]; 

   constructor ( private route: ActivatedRoute,
      private es: EntryService ) { }

   ngOnInit() {

      this.route.paramMap.pipe(
         map( params => params.get( 'id' ) ),
         switchMap( fixtureId => this.es.getEntries$( fixtureId ) ),
         untilDestroyed(this)
      ).subscribe( entry => {
         this.fixture = entry;
         this.applyFilter( "" );
         this.entries = this.fixture.entries;
      } );
   }

   setFilter( event: KeyboardEvent) {
      const target = event.target as HTMLTextAreaElement;
      this.applyFilter( target.value);
   }

   applyFilter( filterValue: string ) {
      const str = filterValue.trim().toLowerCase();
      this.entries = this.fixture.entries.filter( ( entry ) => {
         return entry.firstname.toLowerCase().startsWith( str ) ||
            entry.surname.toLowerCase().startsWith( str ) ||
            entry.club.toLowerCase().startsWith( str );
      } );
   }

   entriesForCourse( course: EntryCourse ): Entry[] {
      return this.entries.filter( ( entry ) => entry.course === course.name );
   }
}
