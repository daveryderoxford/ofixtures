import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { FilterPipeModule } from "../fixtures/fixture-pipes";
import { EnterComponent } from './enter/enter.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryRoutingModule } from './entry-routing.module';

@NgModule({
    declarations: [
        EntryListComponent,
        EnterComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        EntryRoutingModule,
        FilterPipeModule
    ]
})
export class EntryModule { }
