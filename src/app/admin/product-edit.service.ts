import { computed, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  async createProduct(newProduct: CreateProduct, images: FileUrl[]) {
    const imagesName: string[] =
      (await this.chargeListProductFile(images)) ?? [];

    const product: CreateProduct = { images: imagesName, ...newProduct };

    return this.http.patch(this.URL + `products/`, product).pipe(
      map((resp) => resp),
      catchError((error: any) => {
        throw new Error(
          'It was not possible create product. Please try again later.'
        );
      })
    );
  }

  async editProduct(id: string, newProduct: CreateProduct, images: FileUrl[]) {
    const imagesName: string[] =
      (await this.chargeListProductFile(images)) ?? [];
    newProduct.images?.map((image) => imagesName.push(image));

    const product: CreateProduct = { ...newProduct, images: imagesName };

    return this.http.patch(this.URL + `products/${id}`, product).pipe(
      map((resp) => resp),
      catchError((error: any) => {
        throw new Error(
          'It was not possible edit product, title or slug in use'
        );
      })
    );
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

  private async chargeListProductFile(images: FileUrl[]): Promise<string[]> {
    const uploadPromises = images.map((image) =>
      this.chargeProductFile(image.file).toPromise()
    );

    const results = await Promise.all(uploadPromises);
    return results.map((result) => {
      const url = result!.secureUrl.split('/');
      return url[url.length - 1];
    });
  }

  private chargeProductFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http
      .post<{ secureUrl: string }>(this.URL + `files/product`, formData)
      .pipe(
        map((resp) => resp),
        catchError((error: any) => {
          throw new Error(
            'It was not possible to upload image. Please try again later.'
          );
        })
      );
  }
}
