import { Routes } from '@angular/router';
import { NotAuthenticated } from './auth/guards/not-authenticated.guard';
import { IsAuthenticated } from './auth/guards/is-authenticated.guard';
import { IsAdminGuard } from './auth/guards/is-admin.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
    canMatch: [NotAuthenticated],
  },
  {
    path: 'dashboard-admin',
    loadChildren: () =>
      import('./admin/admin.routes').then((m) => m.adminRoutes),
    canMatch: [IsAdminGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./store/store.routes').then((m) => m.storeRoutes),
  },
];
