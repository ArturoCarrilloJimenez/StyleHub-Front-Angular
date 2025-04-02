import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItems {
  title: string;
  route: string;
}

@Component({
  selector: 'shared-navbar-dropdown-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.scss',
})
export class DropdownMenuComponent {
  sidebarItems: MenuItems[] = [
    {
      title: 'Home',
      route: '/',
    },
  ];
}
