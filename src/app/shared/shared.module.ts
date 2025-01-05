
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
    AngularSplitModule,
],
    exports: [
    AngularSplitModule,

],
})
export class SharedModule { }
