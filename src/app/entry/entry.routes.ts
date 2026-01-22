import { Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/guards/auth-guard';
import { PendingChangesGuard } from 'app/shared/services/pending-changes-guard-service.guard';
import { EnterPage } from './enter-page/enter-page';
import { EntryList } from './entry-list/entry-list';

export const ENTRY_ROUTES: Routes = [
  { path: "entrylist/:id", component: EntryList },
  { path: "enter/:fixtureId", component: EnterPage, canDeactivate: [PendingChangesGuard], canActivate: [AuthGuard] }
];
