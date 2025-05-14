import { computed, Injectable, signal } from '@angular/core';
import {
  Product,
  ProductsResponse,
} from './interfaces/product-response.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { catchError, map, tap } from 'rxjs';
import { GetProductParam } from './interfaces/get-product-params.interface';
import { TypeProductResponse } from './interfaces/product-type.interface';

@Injectable({
  providedIn: 'any',
})
export class StoreProductsService {
  protected URL = environment.baseUrl;

  protected _products = signal<ProductsResponse | null>(null);

  constructor(protected readonly http: HttpClient) {}

  products = computed<ProductsResponse | null>(() => this._products());

  getProducts({
    limit = 12,
    page = 1,
    activeProducts = true,
    types = [],
    genders = [],
    search = '',
    minPrice = 0,
    maxPrice = Number.MAX_SAFE_INTEGER,
  }: GetProductParam) {
    let activeProductsParam = +activeProducts;

    const typesParam = types.reduce(
      (params, types) => (params = params + `&types=${types}`),
      ''
    );
    const gendersParam = genders.reduce(
      (params, gender) => (params = params + `&genders=${gender}`),
      ''
    );

    console.log(
      `products/?limit=${limit}&page=${page}&activeProducts=${activeProductsParam}&search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}${typesParam}${gendersParam}`
    );

    return this.http
      .get<ProductsResponse>(
        this.URL +
          `products/?limit=${limit}&page=${page}&activeProducts=${activeProductsParam}&search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}${typesParam}${gendersParam}`
      )
      .pipe(
        tap((resp) => {
          this._products.set(resp);
        }),
        map((resp) => resp),
        catchError((error: any) => {
          throw {
            error:
              'It was not possible to load products. Please try again later.',
          };
        })
      );
  }

  getOneProduct(idSlug: string) {
    return this.http.get<Product>(this.URL + `products/${idSlug}`).pipe(
      map((resp) => resp),
      catchError((error: any) => {
        throw new Error(
          'It was not possible to load product. Please try again later.'
        );
      })
    );
  }

  getAllCategory() {
    return this.http
      .get<TypeProductResponse[]>(this.URL + `products/type`)
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
          throw new Error(
            'It was not possible to load product. Please try again later.'
          );
        })
      );
  }
}
