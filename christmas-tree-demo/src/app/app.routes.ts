import { Routes } from '@angular/router';
import { ZonePageComponent } from './pages/zone-page/zone-page.component';
import { OnPushPageComponent } from './pages/onpush-page/onpush-page.component';
import { ZonelessPageComponent } from './pages/zoneless-page/zoneless-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'zone-tree', pathMatch: 'full' },
  { path: 'zone-tree', component: ZonePageComponent },
  { path: 'onpush-tree', component: OnPushPageComponent },
  { path: 'zoneless-tree', component: ZonelessPageComponent }
];
