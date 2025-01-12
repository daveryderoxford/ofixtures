import { Component } from '@angular/core';

@Component({
  selector: 'app-control-panel',
  template: `
      <div class="control-panel">
         <ng-content/>
      </div>
   `,
  styles: [`
      :host { 
         box-shadow: var(--mat-sys-level1);
         border-radius: 25px;
         padding: 7px;
         background-color: green;
      } 
  `]
})
export class ControlPanelComponent {
}


