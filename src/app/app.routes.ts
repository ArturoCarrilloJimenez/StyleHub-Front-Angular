import { Routes } from '@angular/router';
import { NotAuthenticated } from './auth/guards/not-authenticated.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
    canMatch: [NotAuthenticated],
  },
  {
    path: '',
    loadChildren: () =>
      import('./store/store.routes').then((m) => m.storeRoutes),
  },
];
