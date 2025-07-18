import { Component, signal } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LimitCharacterTextPipe } from '../../../pipes/limit-character-text.pipe';
import { AvatarImageComponent } from '../../profile/avatar-image/avatar-image.component';

@Component({
  selector: 'shared-navbar-avatar-perfile',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    LimitCharacterTextPipe,
    AvatarImageComponent,
  ],
  templateUrl: './avatar-perfile.component.html',
  styleUrl: './avatar-perfile.component.scss',
})
export class AvatarPerfileComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  authStatus() {
    return this.authService.authStatus();
  }

  username() {
    return this.authService.user()?.fullName;
  }

  email() {
    return this.authService.user()?.email;
  }

  isAdmin() {
    return !!this.authService.user()?.roles.find((role) => role == 'admin');
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
