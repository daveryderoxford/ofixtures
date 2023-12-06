
/** Shared componens and services  */
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularSplitModule } from 'angular-split';

import { SidenavButtonComponent } from './components/sidenav-button.component';

import { ToolbarComponent } from './components/toolbar.component';

import { ExternalLinkIconComponent } from './components/external-link-icon.component';
import { EllipsisPipe } from "./pipes/ellipsis-pipe";
import { NgLetDirective } from "./components/ngLetDirective";

@NgModule({
    imports: [
    CommonModule,
    AngularSplitModule.forRoot(),
    SidenavButtonComponent,
    ToolbarComponent,
    ExternalLinkIconComponent,
    EllipsisPipe,
    NgLetDirective,
],
    exports: [
    CommonModule,
    SidenavButtonComponent,
    ToolbarComponent,
    AngularSplitModule,
    ExternalLinkIconComponent,
    EllipsisPipe,
    NgLetDirective
],
})
export class SharedModule { }
