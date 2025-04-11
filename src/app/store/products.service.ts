import { computed, Injectable, signal } from '@angular/core';
import { ProductsResponse } from './interfaces/product-response.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class ProductsService {
  private URL = environment.baseUrl;

  private _products = signal<ProductsResponse | null>(null);

  constructor(private readonly http: HttpClient) {}

  products = computed<ProductsResponse | null>(() => this._products());

  getProducts(limit: number = 12, page: number = 1) {
    return this.http
      .get<ProductsResponse>(this.URL + `products/?limit=${limit}&page=${page}`)
      .pipe(
        tap((resp) => {
          this._products.set(resp);
        }),
        map((resp) => resp),
        catchError((error: any) => {
          return of({
            error:
              'It was not possible to load products. Please try again later.',
          });
        })
      );
  }
}
