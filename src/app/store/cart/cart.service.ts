import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { catchError, map, of, tap } from 'rxjs';
import { CartResponse } from './interfaces/cart.intreface';

@Injectable({ providedIn: 'root' })
export class CartService {
  private BASE = environment.baseUrl;

  private _cart = signal<CartResponse | null>(null);

  constructor(private httpClient: HttpClient) {}

  cart = computed<CartResponse | null>(() => this._cart());

  getCart() {
    return this.httpClient.get<CartResponse>(this.BASE + 'cart').pipe(
      tap((resp) => {
        this._cart.set(resp);
      }),
      map((resp) => resp),
      catchError((error: any) => {
        return of({
          error: 'It was not possible to load cart. Please try again later.',
        });
      })
    );
  }

  setProduct(product: string, quantity?: number) {
    return this.httpClient
      .patch<CartResponse>(this.BASE + 'cart', { product, quantity })
      .pipe(
        tap((resp) => {
          this._cart.set(resp);
        }),
        map((resp) => resp),
        catchError((error: any) => {
          return of({
            error: 'It was not possible to load cart. Please try again later.',
          });
        })
      );
  }

  deleteProduct(product: string) {
    return this.httpClient.delete<CartResponse>(`${this.BASE}cart/${product}`).pipe(
      tap((resp) => {
        this._cart.set(resp);
      }),
      map((resp) => resp),
      catchError((error: any) => {
        return of({
          error:
            'It was not possible delete product of cart. Please try again later.',
        });
      })
    );
  }

  deleteCart() {
    this.httpClient.delete(`${this.BASE}cart`).pipe(
      tap(() => {
        this._cart.set(null);
      }),
      catchError((error: any) => {
        return of({
          error: 'It was not possible delete cart. Please try again later.',
        });
      })
    ).subscribe();
  }
}
