import { Routes } from '@angular/router';
import { NotAuthenticated } from './auth/guards/not-authenticated.guard';
import { IsAuthenticated } from './auth/guards/is-authenticated.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
    canMatch: [NotAuthenticated],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.routes').then((m) => m.profileRoutes),
    canMatch: [IsAuthenticated],
  },
  {
    path: '',
    loadChildren: () =>
      import('./store/store.routes').then((m) => m.storeRoutes),
  },
];
