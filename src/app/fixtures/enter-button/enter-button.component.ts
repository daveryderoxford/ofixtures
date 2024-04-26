
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { EntryStatus } from 'app/model/fixture';
import { input } from "@angular/core";

@Component({
  selector: 'app-enter-button',
  standalone: true,
  imports: [MatLegacyButtonModule, MatIconModule],
  templateUrl: './enter-button.component.html',
  styleUrls: ['./enter-button.component.scss'],
})

export class EnterButtonComponent {

  buttonText: string;
  _status: EntryStatus

  url = input.required<string>();

  @Input({ required: true }) set status(val: EntryStatus) {
    this._status = val;
    if (val === 'Open') {
      this.buttonText = 'Enter';
    } else {
      this.buttonText = val;
    }
  }

  selectColor(): string {
    if (this._status === 'Open') {
      return 'enter'
    } else {
      return 'other'
    }

  }

}

