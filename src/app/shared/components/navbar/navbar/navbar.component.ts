import { Component } from '@angular/core';

import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';
import { environment } from '../../../../../environments/environments';
import { AvatarPerfileComponent } from "../avatar-perfile/avatar-perfile.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [DropdownMenuComponent, AvatarPerfileComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  title = environment.title
}
