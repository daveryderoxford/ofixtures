import { Component, input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavButton } from './sidenav-button';

@Component({
    selector: 'app-toolbar',
    template: `
<mat-toolbar>
   <app-sidenav-button/> 
   {{ title() }}
  <ng-content/>
</mat-toolbar>
    `,
    imports: [MatToolbarModule, SidenavButton]
})
export class AppToolbar {

  title = input.required<string>();
}

