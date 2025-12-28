import { Component, input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavButtonComponent } from './sidenav-button.component';

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

