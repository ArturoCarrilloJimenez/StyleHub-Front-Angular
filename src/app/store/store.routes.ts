import { Routes } from '@angular/router';

export const storeRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/store-layout/store-layout.component').then(
        (m) => m.StoreLayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home-page/home-page.component').then(
            (m) => m.HomePageComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
