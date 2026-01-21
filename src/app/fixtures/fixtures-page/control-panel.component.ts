import { Component } from '@angular/core';

@Component({
  selector: 'app-control-panel',
  template: `
      <ng-content/>
   `,
  styles: [`
      :host { 
         box-shadow: var(--mat-sys-level1);
         border-radius: 25px;
         padding: 7px;
         background-color: white;
      } 
  `]
})
export class ControlPanelComponent {
}


