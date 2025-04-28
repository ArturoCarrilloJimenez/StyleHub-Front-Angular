import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    title: 'Admin Dashboard | StyleHub',
    loadComponent: () =>
      import('./layouts/dashboard/dashboard.component').then(
        (m) => m.DashboardAdminComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/product-edit-page/product-edit-page.component').then(
            (m) => m.ProductEditPageComponent
          ),
      },
    ],
  },
];
