import { Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/guards/auth-guard';
import { PendingChangesGuard } from 'app/shared/services/pending-changes-guard-service.guard';
import { UserEditPage } from './user-page/user-edit-page';

export const USER_ROUTES: Routes = [
  { path: "", component: UserEditPage, canActivate: [AuthGuard], canDeactivate: [PendingChangesGuard] },
];

