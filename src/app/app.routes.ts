import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('./store/store.routes').then((m) => m.storeRoutes),
  },
];
