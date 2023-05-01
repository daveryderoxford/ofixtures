import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-external-link-icon',
  template: `<mat-icon class="icon-display">open_in_new</mat-icon>`,
  styles: [ ".icon-display { transform: scale( 0.55 );  color: rgb( 50, 50, 50 );}" ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExternalLinkIconComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
