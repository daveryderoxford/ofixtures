import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';

import { EnterComponent } from './enter/enter.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryRoutingModule } from './entry-routing.module';

@NgModule({
    imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    EntryRoutingModule,
    EntryListComponent,
    EnterComponent
]
})
export class EntryModule { }
