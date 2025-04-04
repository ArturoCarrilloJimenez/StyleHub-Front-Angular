import { Component } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-profile-avatar-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar-image.component.html',
  styleUrl: './avatar-image.component.scss',
})
export class AvatarImageComponent {
  constructor(
    private readonly authService: AuthService,
  ) {}

  firsLetterUserName(): string {
    const user = this.authService.user;
    const fullName = user()?.fullName.split(' ');

    if (!fullName) return '';

    return fullName.length >= 2
      ? `${fullName[0][0]}${fullName[1][0]}`
      : `${fullName[0][0]}`;
  }
}
