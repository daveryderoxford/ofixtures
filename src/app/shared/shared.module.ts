
/** Shared componens and services  */
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularSplitModule } from 'angular-split';
import { AppMaterialModule } from "./components/material/app-material.module";
import { SidenavButtonComponent } from './components/sidenav-button.component';
import { SpinnerModule } from './components/spinner/spinner.module';
import { ToolbarComponent } from './components/toolbar.component';
import { DialogsModule } from "./dialogs/dialogs.module";
import { ExternalLinkIconComponent } from './components/external-link-icon.component';
import { EllipsisPipe } from "./pipes/ellipsis-pipe";
import { NgLetDirective } from "./components/ngLetDirective";

@NgModule({
    imports: [
        CommonModule,
        DialogsModule,
        SpinnerModule,
        AppMaterialModule,
        AngularSplitModule.forRoot(),
    ],
    declarations: [
        SidenavButtonComponent,
        ToolbarComponent,
        ExternalLinkIconComponent,
        EllipsisPipe,
        NgLetDirective
    ],
    exports: [
        CommonModule,
        SpinnerModule,
        DialogsModule,
        AppMaterialModule,
        SidenavButtonComponent,
        ToolbarComponent,
        AngularSplitModule,
        ExternalLinkIconComponent,
        EllipsisPipe,
        NgLetDirective
    ],
})
export class SharedModule { }
