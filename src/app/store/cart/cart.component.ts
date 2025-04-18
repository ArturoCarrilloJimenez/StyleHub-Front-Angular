import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { heroShoppingCartMini } from '@ng-icons/heroicons/mini';

@Component({
  selector: 'store-cart',
  standalone: true,
  imports: [NgIcon, CommonModule],
  viewProviders: [provideIcons({ heroShoppingCartMini })],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
// TODO hacer pag de cart y orientadlo para ordenar en un futuro ordenes
export class CartComponent {
  constructor(private readonly authService: AuthService) {}

  authStatus() {
    return this.authService.authStatus();
  }
}
