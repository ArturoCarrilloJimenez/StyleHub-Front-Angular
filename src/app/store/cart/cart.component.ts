import { Component, computed, OnInit, signal } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { heroShoppingCartMini } from '@ng-icons/heroicons/mini';
import { CartService } from './cart.service';
import { CartResponse } from './interfaces/cart.intreface';
import { RouterLink } from '@angular/router';
import { ProductCartComponent } from './components/product-cart/product-cart.component';

// mejorar la estética del carrito
@Component({
  selector: 'store-cart',
  standalone: true,
  imports: [NgIcon, CommonModule, RouterLink, ProductCartComponent],
  viewProviders: [provideIcons({ heroShoppingCartMini })],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cart = computed<CartResponse | null>(() => this.cartService.cart());

  constructor(
    private readonly authService: AuthService,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe();
  }

  authStatus() {
    return this.authService.authStatus();
  }
}
