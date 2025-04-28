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
          import('./pages/home-dashboard-admin-page/home-dashboard-admin-page.component').then(
            (m) => m.HomeDashboardAdminPageComponent
          ),
      },
    ],
  },
];
