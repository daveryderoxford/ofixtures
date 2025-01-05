import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MapviewerRoutingModule } from './mapviewer-routing.module';
import { MapviewerComponent } from './mapviewer.component';




@NgModule({
    imports: [
    CommonModule,
    MapviewerRoutingModule,
    MapviewerComponent
]
})
export class MapviewerModule { }

