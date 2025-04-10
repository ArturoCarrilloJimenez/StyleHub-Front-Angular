import { Routes } from '@angular/router';
import { IsAuthenticated } from '../auth/guards/is-authenticated.guard';

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
        title: 'home',
        loadComponent: () =>
          import('./pages/home-page/home-page.component').then(
            (m) => m.HomePageComponent
          ),
      },
      {
        path: 'products',
        title: 'products',
        loadComponent: () =>
          import('./pages/product-page/product-page.component').then(
            (m) => m.ProductPageComponent
          ),
      },
      {
        path: 'cart',
        title: 'cart',
        loadComponent: () =>
          import('./cart/cart.component').then((m) => m.CartComponent),
        canMatch: [IsAuthenticated],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
