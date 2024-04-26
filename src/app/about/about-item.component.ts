import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { input } from "@angular/core";

@Component({
    selector: 'app-about-item',
    
        template: `
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>
        {{title()}}
      </mat-panel-title>
    </mat-expansion-panel-header>
    <ng-content></ng-content>
  </mat-expansion-panel>
  `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatExpansionModule]
})
export class AboutItemComponent implements OnInit {

  title = input<string>();

  constructor() { }

  ngOnInit() {
  }

;
}
