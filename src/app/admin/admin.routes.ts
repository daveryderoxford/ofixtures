import { Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/guards/auth-guard';
import { PendingChangesGuard } from 'app/shared/services/pending-changes-guard-service.guard';
import { FixtureAddPage } from './additional-fixture/fixture-add.page';
import { FixtureEditPage } from './additional-fixture/fixture-edit.page';
import { AdminPage } from './admin-page/admin-page';
import { MapRegistrationAdminPage } from './entry-admin/map-registration-admin-page/map-registration-admin-page';
import { LeagueAddPage } from './league-admin/league-add-page';
import { LeagueEditPage } from './league-admin/league-edit-page';

export const ADMIN_ROUTES: Routes = [
  { path: '', component: AdminPage },
  { path: 'league/add', component: LeagueAddPage, canDeactivate: [PendingChangesGuard], canActivate: [AuthGuard] },
  { path: 'league/edit/:id', component: LeagueEditPage, canDeactivate: [PendingChangesGuard], canActivate: [AuthGuard] },
  { path: 'fixture/add', component: FixtureAddPage, canDeactivate: [PendingChangesGuard], canActivate: [AuthGuard] },
  { path: 'fixture/edit/:id', component: FixtureEditPage, canDeactivate: [PendingChangesGuard], canActivate: [AuthGuard] },
  { path: "mapregistration", component: MapRegistrationAdminPage, canDeactivate: [PendingChangesGuard], canActivate: [AuthGuard] },
  { path: "mapregistration/:id", component: MapRegistrationAdminPage, canDeactivate: [PendingChangesGuard], canActivate: [AuthGuard] },
];
 
