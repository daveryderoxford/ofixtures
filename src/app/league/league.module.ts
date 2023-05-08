import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { FixturesModule } from 'app/fixtures/fixtures.module';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    SharedModule,
    FixturesModule,
  ]
})
export class LeagueModule { }
