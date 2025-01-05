import { Component, OnInit, Input} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { input } from "@angular/core";

@Component({
    selector: 'app-spinner',
    template: `
     @if (loading()) {
       <div class="loading-spinner">
         <mat-spinner mode="indeterminate" color="accent" diameter="40" ></mat-spinner>
       </div>
     }
     `,
    styleUrls: ['./spinner.component.scss'],
    imports: [MatProgressSpinnerModule]
})
export class SpinnerComponent implements OnInit {

  loading = input(false);

  ngOnInit() {
  }

;
}
