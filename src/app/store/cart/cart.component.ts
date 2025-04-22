import { Component, computed, ElementRef, HostListener, OnInit, signal, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { heroShoppingCartMini } from '@ng-icons/heroicons/mini';
import { CartService } from './cart.service';
import { CartResponse } from './interfaces/cart.intreface';
import { RouterLink } from '@angular/router';
import { ProductCartComponent } from './components/product-cart/product-cart.component';
import { heroTruckSolid } from '@ng-icons/heroicons/solid';

// mejorar la estética del carrito
@Component({
  selector: 'store-cart',
  standalone: true,
  imports: [NgIcon, CommonModule, RouterLink, ProductCartComponent],
  viewProviders: [provideIcons({ heroShoppingCartMini, heroTruckSolid })],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cart = computed<CartResponse | null>(() => this.cartService.cart());
  showCart = signal(false);

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

  changeShowCart() {
    this.showCart.set(!this.showCart());
  }

  @ViewChild('dropdown') miElemento!: ElementRef;

  @HostListener('document:click', ['$event'])
  clickFuera(event: MouseEvent) {
    if (
      this.miElemento &&
      !this.miElemento.nativeElement.contains(event.target)
    ) {
      this.showCart.set(false);
    }
  }
}
