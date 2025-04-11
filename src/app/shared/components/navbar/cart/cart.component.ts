import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroShoppingCartMini } from '@ng-icons/heroicons/mini';
import { AuthService } from '../../../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'shared-navbar-cart',
  standalone: true,
  imports: [NgIcon, CommonModule, RouterLink],
  viewProviders: [provideIcons({ heroShoppingCartMini })],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
// TODO sacar el numero de artículos he indicarlo en el indice
export class CartComponent {
  constructor(
    private readonly authService: AuthService,
  ) {}

  authStatus() {
    return this.authService.authStatus();
  }
}
