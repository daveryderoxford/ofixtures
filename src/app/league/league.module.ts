import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { LeagueEditComponent } from './league-edit/league-edit.component';
import { FixturesModule } from 'app/fixtures/fixtures.module';

@NgModule({
  declarations: [
    LeagueEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FixturesModule
  ]
})
export class LeagueModule { }
