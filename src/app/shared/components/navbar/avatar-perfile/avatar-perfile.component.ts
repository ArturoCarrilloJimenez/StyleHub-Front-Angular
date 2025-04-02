import { Component, signal } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-navbar-avatar-perfile',
  standalone: true,
  imports: [RouterLink ,RouterLinkActive ,CommonModule],
  templateUrl: './avatar-perfile.component.html',
  styleUrl: './avatar-perfile.component.scss',
})
export class AvatarPerfileComponent {
  // TODO Añadir enlace cuando se cree la pagina de perfil
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  authStatus() {
    return this.authService.authStatus();
  }

  firsLetterUserName(): string {
    const user = this.authService.user;
    const fullName = user()?.fullName.split(' ');

    if (!fullName) return ''

    return fullName.length >= 2
      ? `${fullName[0][0]}${fullName[1][0]}`
      : `${fullName[0][0]}`;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
