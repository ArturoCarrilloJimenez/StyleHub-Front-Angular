import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { catchError, map, tap } from 'rxjs';
import { CartResponse, ProductCart } from './interfaces/cart.intreface';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CartService {
  private BASE = environment.baseUrl;

  private _cart = signal<CartResponse | null>(null);
  private _cartProduct = signal<ProductCart | null>(null);

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {}

  cart = computed<CartResponse | null>(() => this._cart());
  cartProduct = computed<ProductCart | null>(() => this._cartProduct());

  getCart() {
    return this.httpClient.get<CartResponse>(this.BASE + 'cart').pipe(
      tap((resp) => {
        this._cart.set(resp);
      }),
      map((resp) => resp),
      catchError((error: any) => {
        throw {
          error: 'It was not possible to load cart. Please try again later.',
        };
      })
    );
  }

  getOneProductCart(idProduct: string) {
    return this.getCart()
      .pipe(
        map((cart) => {
          return cart.products.reduce<ProductCart | null>(
            (productCart, current) => {
              return current.product.id === idProduct ? current : productCart;
            },
            null
          );
        })
      )
      .subscribe((productCart) => {
        this._cartProduct.set(productCart);
      });
  }

  setProduct(product: string, size?: string, quantity?: number) {
    return this.httpClient
      .patch<CartResponse>(this.BASE + 'cart', { product, quantity, size })
      .pipe(
        tap((resp) => {
          this._cart.set(resp);
        }),
        map((resp) => resp),
        catchError((error: any) => {
          throw {
            error: 'It was not possible to load cart. Please try again later.',
          };
        })
      );
  }

  deleteProduct(product: string) {
    return this.httpClient
      .delete<CartResponse>(`${this.BASE}cart/${product}`)
      .pipe(
        tap((resp) => {
          this._cart.set(resp);
        }),
        map((resp) => resp),
        catchError((error: any) => {
          throw {
            error:
              'It was not possible delete product of cart. Please try again later.',
          };
        })
      );
  }

  deleteCart() {
    this.httpClient
      .delete(`${this.BASE}cart`)
      .pipe(
        tap(() => {
          this._cart.set(null);
        }),
        catchError((error: any) => {
          throw {
            error: 'It was not possible delete cart. Please try again later.',
          };
        })
      )
      .subscribe();
  }

  generateOrder() {
    return this.httpClient
      .post<{ url: string }>(`${this.BASE}order`, {
        urlAcceptPayment: `${window.location.origin}/order-success`,
        urlCancelPayment: window.location.href,
      })
      .pipe(
        tap((orderUrl) => (window.location.href = orderUrl.url)),
        catchError((error: any) => {
          throw {
            error: 'It was not possible create order. Please try again later.',
          };
        })
      );
  }
}
