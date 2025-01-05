import { Routes } from '@angular/router';
import { FixturesComponent } from './fixtures/fixtures/fixtures.component';

export const APP_ROUTES: Routes = [
   { path: '', redirectTo: '/fixtures', pathMatch: 'full' },
   { path: "fixtures", component: FixturesComponent },
   { path: "fixtures/:mapview", component: FixturesComponent },
   { path: "auth", loadChildren: () => import('./auth/auth.routes').then(r => r.AUTH_ROUTES) },
   { path: "user", loadChildren: () => import('./user/user.routes').then(r => r.USER_ROUTES) },
   { path: "about", title: 'About OFixtures', loadComponent: () => import('./about/about.component').then(c => c.AboutComponent) },
   { path: "entry", loadChildren: () => import('./entry/entry.routes').then(r => r.ENTRY_ROUTES) },
   { path: 'mapviewer', title: 'Map viewer', loadComponent: () => import('./mapviewer/mapviewer.component').then(c => c.MapviewerComponent) }, 
   { path: 'admin', loadChildren: () => import('./admin/admin.routes').then(r => r.ADMIN_ROUTES) },
];
