import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/dashboard/dashboard.component').then(
        (m) => m.DashboardAdminComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./layouts/dashboard/dashboard.component').then(
            (m) => m.DashboardAdminComponent
          ),
      },
    ],
  },
];
