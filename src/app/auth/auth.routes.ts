import { Routes } from '@angular/router';
import { environment } from '../../environments/environments';

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      {
        path: 'login',
        title: `Login | ${environment.title}`,
        loadComponent: () =>
          import('./pages/login-page/login-page.component').then(
            (m) => m.LoginPageComponent
          ),
      },
      {
        path: 'register',
        title: `Register | ${environment.title}`,
        loadComponent: () =>
          import('./pages/register-page/register-page.component').then(
            (m) => m.RegisterPageComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];
