import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin-page/admin.component';
import { LeagueAdminCardComponent } from './league-admin/league-admin-card/league-admin-card.component';
import { LeagueFormComponent } from './league-admin/league-form/league-form.component';
import { LeagueEditComponent } from './league-admin/league-edit.component';
import { LeagueAddComponent } from './league-admin/league-add.component';
import { MapRegistrationAdminComponent } from './entry-admin/map-registration-admin/map-registration-admin.component';
import { FixtureSelectComponent } from './fixture-select/fixture-select.component';
import { CourseDialogComponent } from './entry-admin/course-dialog/course-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FixtureFormComponent } from './additional-fixture/fixture-form/fixture-form.component';
import { FixtureAddComponent } from './additional-fixture/fixture-add.component';
import { FixtureEditComponent } from './additional-fixture/fixture-edit.component';
import { FixtureAdminCardComponent } from './additional-fixture/fixture-admin-card/fixture-admin-card.component';

@NgModule({
    imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    AdminComponent,
    LeagueAdminCardComponent,
    LeagueFormComponent,
    LeagueEditComponent,
    LeagueAddComponent,
    MapRegistrationAdminComponent,
    FixtureSelectComponent,
    CourseDialogComponent,
    FixtureFormComponent,
    FixtureAddComponent,
    FixtureEditComponent,
    FixtureAdminCardComponent
]
})
export class AdminModule { }
