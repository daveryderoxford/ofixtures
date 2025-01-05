import { Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/guards/auth-guard';
import { PendingChangesGuard } from 'app/shared/services/pending-changes-guard-service.guard';
import { EnterComponent } from './enter/enter.component';
import { EntryListComponent } from './entry-list/entry-list.component';

export const ENTRY_ROUTES: Routes = [
  { path: "entrylist/:id", component: EntryListComponent },
  { path: "enter/:fixtureId", component: EnterComponent, canDeactivate: [PendingChangesGuard], canActivate: [AuthGuard] }
];
