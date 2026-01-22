
import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EntryStatus } from 'app/fixtures/@store/fixture';
import { input } from "@angular/core";

@Component({
    selector: 'app-enter-button',
    imports: [MatButtonModule, MatIconModule],
    templateUrl: './enter-button.html',
    styleUrls: ['./enter-button.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class EnterButton {

  url = input.required<string>();
  status = input<EntryStatus>();

  selectColor = computed(() => (this.status && this.status() === 'Open') ? 'enter' : 'other' ); 

}