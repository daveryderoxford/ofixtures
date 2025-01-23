import { Component, computed, inject, OnInit, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ClubService } from './club-service';

@Component({
  selector: 'app-select-club',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatSelectModule],
  styleUrl: "select-club.component.scss",
  template: `
  <div class=row>
  <span class=text>Club </span>
  <mat-form-field class=select subscriptSizing="dynamic" appearance="outline">

   <mat-select [formControl]="club">
      @for (name of names(); track name) {
        <mat-option [value]="name">
          {{ name }}
        </mat-option>
      }
   </mat-select>
  </mat-form-field>
  </div>
  `
})
export class SelectClubComponent implements OnInit {
  cs = inject(ClubService);

  club = new FormControl<string>('');
  selected = output<string>();

  names = computed(() => this.cs.clubs().map(club => club.name));

  ngOnInit() {
    this.club.valueChanges.subscribe(value => {
      console.log('Club select value:' + value);
      this.selected.emit(value!);
    });
  }
}
