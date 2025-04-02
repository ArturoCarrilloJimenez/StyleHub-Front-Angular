import { Routes } from '@angular/router';

export const profileRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/profile-layouts/profile-layouts.component').then(
        (m) => m.ProfileLayoutsComponent
      ),
    children: [
      {
        path: '',
        title: 'Edit profile',
        loadComponent: () =>
          import('./pages/edit-pages/edit-pages.component').then(
            (m) => m.EditPagesComponent
          ),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
