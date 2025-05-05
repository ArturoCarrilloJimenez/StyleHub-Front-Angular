import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import {
  Product,
  ProductsResponse,
} from '../store/interfaces/product-response.interface';
import { catchError, map, tap } from 'rxjs';
import { TypeProductResponse } from './interfaces/product-type.interface';
import { CreateProduct, FileUrl } from './interfaces/create-product.interface';

@Injectable({ providedIn: 'root' })
export class ProductEditService {
  private URL = environment.baseUrl;

  private _products = signal<ProductsResponse | null>(null);

  constructor(private readonly http: HttpClient) {}

  products = computed<ProductsResponse | null>(() => this._products());

  getProducts(
    limit: number = 12,
    page: number = 1,
    activeProducts: boolean = true
  ) {
    return this.http
      .get<ProductsResponse>(
        this.URL +
          `products/?limit=${limit}&page=${page}&activeProducts=${activeProducts}`
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
    return this.http.get<TypeProductResponse[]>(this.URL + `products/type`).pipe(
      map((resp) => resp),
      catchError((error: any) => {
        throw new Error(
          'It was not possible to load product. Please try again later.'
        );
      })
    );
  }

  createProduct(newProduct: CreateProduct, images: FileUrl[]) {
    console.log(newProduct);
  }

  deleteProduct(idSlug: string) {
    return this.http.delete(this.URL + `products/${idSlug}`).pipe(
      map((resp) => true),
      catchError((error: any) => {
        throw new Error(
          'It was not possible to load product. Please try again later.'
        );
      })
    );
  }

  private chargeProductFile(file: File) {
    return this.http.post(this.URL + `files/product`, file).pipe(
      map((resp) => resp),
      catchError((error: any) => {
        throw new Error(
          'It was not possible charge image. Please try again later.'
        );
      })
    );
  }
}
