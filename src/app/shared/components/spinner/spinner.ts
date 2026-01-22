import { Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-spinner',
    template: `
     @if (loading()) {
       <div class="loading-spinner">
         <mat-spinner mode="indeterminate" diameter="40" ></mat-spinner>
       </div>
     }
     `,
    styleUrls: ['./spinner.scss'],
    imports: [MatProgressSpinnerModule]
})
export class Spinner {

  loading = input(false);

}
