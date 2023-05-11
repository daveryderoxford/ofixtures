import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { LeagueMenuComponent } from './league-menu/league-menu.component';
import { LeagueHeaderComponent } from './league-header/league-header.component';

@NgModule({
  declarations: [ 
    LeagueMenuComponent, LeagueHeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    LeagueMenuComponent,
    LeagueHeaderComponent
  ]
})
export class LeagueModule { }
