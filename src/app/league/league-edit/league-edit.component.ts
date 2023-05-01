import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  templateUrl: './league-edit.component.html',
  styleUrls: ['./league-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeagueEditComponent implements OnInit {

  userForm: FormGroup;
  cardclass = "";

  constructor() { }

  ngOnInit(): void {
    const x=1;
  }

  save() {}

}
