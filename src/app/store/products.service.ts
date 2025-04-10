import { computed, inject, Injectable, signal } from '@angular/core';
import { ProductResponse } from './interfaces/product-response.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { catchError, map, Observable, of, tap } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  RedirectCommand,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private URL = environment.baseUrl;

  private _products = signal<ProductResponse[]>([]);

  constructor(private readonly http: HttpClient) {}

  products = computed<ProductResponse[]>(() => this._products());

  getProducts(limit: number = 12, offset: number = 1) {
    return this.http
      .get<ProductResponse[]>(this.URL + `products/?limit=${limit}&offset=${offset}`)
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
