import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from "./about.component";
import { AboutItemComponent } from './about-item.component';
import { PrivacyPolicyComponent } from './privacy-policy.component';


@NgModule({
    imports: [
    CommonModule,
    AboutRoutingModule,
    AboutComponent,
    AboutItemComponent,
    PrivacyPolicyComponent,
]
})
export class AboutModule { }
