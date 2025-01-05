import { Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/guards/auth-guard';
import { PendingChangesGuard } from 'app/shared/services/pending-changes-guard-service.guard';
import { FixtureAddComponent } from './additional-fixture/fixture-add.component';
import { FixtureEditComponent } from './additional-fixture/fixture-edit.component';
import { AdminComponent } from './admin-page/admin.component';
import { MapRegistrationAdminComponent } from './entry-admin/map-registration-admin/map-registration-admin.component';
import { LeagueAddComponent } from './league-admin/league-add.component';
import { LeagueEditComponent } from './league-admin/league-edit.component';

export const ADMIN_ROUTES: Routes = [
  { path: '', component: AdminComponent },
  { path: 'league/add', component: LeagueAddComponent, canDeactivate: [PendingChangesGuard], canActivate: [AuthGuard] },
  { path: 'league/edit/:id', component: LeagueEditComponent, canDeactivate: [PendingChangesGuard], canActivate: [AuthGuard] },
  { path: 'fixture/add', component: FixtureAddComponent, canDeactivate: [PendingChangesGuard], canActivate: [AuthGuard] },
  { path: 'fixture/edit/:id', component: FixtureEditComponent, canDeactivate: [PendingChangesGuard], canActivate: [AuthGuard] },
  { path: "mapregistration", component: MapRegistrationAdminComponent, canDeactivate: [PendingChangesGuard], canActivate: [AuthGuard] },
  { path: "mapregistration/:id", component: MapRegistrationAdminComponent, canDeactivate: [PendingChangesGuard], canActivate: [AuthGuard] },
];
 
