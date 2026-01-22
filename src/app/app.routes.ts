import { Routes } from '@angular/router';
import { FixturesPage } from './fixtures/fixtures-page/fixtures-page';

export const APP_ROUTES: Routes = [
   { path: '', redirectTo: '/fixtures', pathMatch: 'full' },
   { path: "fixtures", title: 'OFixtures', component: FixturesPage },
   { path: "auth", loadChildren: () => import('./auth/auth.routes').then(r => r.AUTH_ROUTES) },
   { path: "user", loadChildren: () => import('./user/user.routes').then(r => r.USER_ROUTES) },
   { path: "about", title: 'About OFixtures', loadComponent: () => import('./about-page/about-page').then(c => c.AboutPage) },
   { path: "entry", loadChildren: () => import('./entry/entry.routes').then(r => r.ENTRY_ROUTES) },
   { path: 'mapviewer', title: 'Map viewer', loadComponent: () => import('./map-viewer/map-viewer').then(c => c.MapViewer) }, 
   { path: 'admin', loadChildren: () => import('./admin/admin.routes').then(r => r.ADMIN_ROUTES) },
   { path: 'sys-admin', loadChildren: () => import('./sys-admin/sys-admin.routes').then(r => r.SYS_ADMIN_ROUTES) },
];
