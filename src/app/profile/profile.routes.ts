import { Routes } from '@angular/router';
import { environment } from '../../environments/environments';

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
        title: `Profile | ${environment.title}`,
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
