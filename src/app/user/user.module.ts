import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from "./user.component";

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule( {
    imports: [
        CommonModule,
        UserRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        UserComponent
    ],
    exports: [
        UserComponent
    ],
} )
export class UserModule { }
