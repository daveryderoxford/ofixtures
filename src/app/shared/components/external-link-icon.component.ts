import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-external-link-icon',
    template: `<mat-icon class="icon-display">open_in_new</mat-icon>`,
    styles: [".icon-display { transform: scale( 0.55 );  color: rgb( 50, 50, 50 );}"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatIconModule]
})
export class ExternalLinkIconComponent implements OnInit {
  ngOnInit(): void {
  }

}
