import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MapviewerRoutingModule } from './mapviewer-routing.module';
import { MapviewerComponent } from './mapviewer.component';

import { SharedModule } from 'app/shared/shared.module';


@NgModule({
    imports: [
    CommonModule,
    SharedModule,
    MapviewerRoutingModule,
    MapviewerComponent
]
})
export class MapviewerModule { }

