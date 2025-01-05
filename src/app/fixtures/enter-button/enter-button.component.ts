
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EntryStatus } from 'app/model/fixture';
import { input } from "@angular/core";

@Component({
    selector: 'app-enter-button',
    imports: [MatButtonModule, MatIconModule],
    templateUrl: './enter-button.component.html',
    styleUrls: ['./enter-button.component.scss']
})

export class EnterButtonComponent {

  buttonText: string;


  url = input.required<string>();
  status = input.required<EntryStatus>();

  selectColor(): string {
    if (this.status() === 'Open') {
      return 'enter'
    } else {
      return 'other'
    }
  }

}

