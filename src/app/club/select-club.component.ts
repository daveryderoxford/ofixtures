import { Component, computed, effect, inject, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ClubService } from './@store/club-service';

@Component({
  selector: 'app-select-club',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatSelectModule],
  styleUrl: "select-club.component.scss",
  template: `
  <div class=row>
  <span class=text>Club </span>
  <mat-form-field class=select subscriptSizing="dynamic" appearance="outline">

   <mat-select [formControl]="clubControl">
      @for (name of names(); track name) {
        <mat-option [value]="name" (click)="selected.emit(name)">
          {{ name }}
        </mat-option>
      }
   </mat-select>
  </mat-form-field>
  </div>
  `
})
export class SelectClubComponent {
  cs = inject(ClubService);

  club = input<string | undefined>();

  clubControl = new FormControl(this.club());
  selected = output<string>();

  names = computed(() => this.cs.clubs().map(club => club.name));

  constructor() {
    effect(() => {
      this.clubControl.setValue(this.club());
    });
  }
}
