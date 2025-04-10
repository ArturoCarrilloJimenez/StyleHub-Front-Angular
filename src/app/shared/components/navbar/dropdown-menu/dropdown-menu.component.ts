import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../../../../environments/environments';

import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroHomeSolid,
  heroBars3Solid,
  heroShoppingBagSolid,
} from '@ng-icons/heroicons/solid';

interface MenuItems {
  title: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'shared-navbar-dropdown-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, NgIcon],
  viewProviders: [
    provideIcons({ heroHomeSolid, heroBars3Solid, heroShoppingBagSolid }),
  ],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.scss',
})
export class DropdownMenuComponent {
  title = environment.title;
  sidebarItems: MenuItems[] = [
    {
      title: 'Home',
      icon: 'heroHomeSolid',
      route: '/',
    },
    {
      title: 'Products',
      icon: 'heroShoppingBagSolid',
      route: '/products',
    },
  ];
}
