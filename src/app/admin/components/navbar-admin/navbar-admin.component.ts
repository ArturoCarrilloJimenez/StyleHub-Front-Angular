import { Component } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBars3Solid, heroHomeSolid, heroRectangleGroupSolid } from '@ng-icons/heroicons/solid';

interface MenuItems {
  title: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'admin-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, NgIcon],
  viewProviders: [
    provideIcons({ heroHomeSolid, heroBars3Solid, heroRectangleGroupSolid }),
  ],
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.scss',
})
export class NavbarAdminComponent {
  title = environment.title;
  sidebarItems: MenuItems[] = [
    {
      title: 'View Home',
      icon: 'heroHomeSolid',
      route: '/',
    },
    {
      title: 'Dashboard',
      icon: 'heroRectangleGroupSolid',
      route: '/dashboard-admin',
    },
  ];
}
