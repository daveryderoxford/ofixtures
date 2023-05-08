import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeagueAddComponent } from './league-add.component';
import { LeagueEditComponent } from './league-edit.component';

const routes: Routes = [

];

@NgModule( {
   imports: [RouterModule.forChild( routes )],
   exports: [RouterModule]
} )
export class LeagueRoutingModule { }
