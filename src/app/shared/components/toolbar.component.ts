import { Component, OnInit, Input, input } from '@angular/core';
import { SidenavButtonComponent } from './sidenav-button.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-toolbar',
    template: `
<mat-toolbar>
   <app-sidenav-button/> 
   {{ title() }}
  <ng-content/>
</mat-toolbar>
    `,
    imports: [MatToolbarModule, SidenavButtonComponent]
})
export class ToolbarComponent {

  title = input.required<string>();
}

