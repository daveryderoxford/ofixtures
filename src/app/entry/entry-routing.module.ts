import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/auth/guards/auth-guard';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EnterComponent } from './enter/enter.component';
import { PendingChangesGuard } from 'app/shared/services/pending-changes-guard-service.guard';

const routes: Routes = [
  { path: "entrylist/:id", component: EntryListComponent },
  { path: "enter/:fixtureId", component: EnterComponent, canDeactivate: [PendingChangesGuard], canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryRoutingModule { }
