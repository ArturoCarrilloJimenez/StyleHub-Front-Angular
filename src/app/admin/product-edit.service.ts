import { Injectable } from '@angular/core';
import { Product } from '../store/interfaces/product-response.interface';
import { catchError, map } from 'rxjs';
import { CreateProduct, FileUrl } from './interfaces/create-product.interface';
import { StoreProductsService } from '../store/store.service';

@Injectable({ providedIn: 'root' })
export class ProductEditService extends StoreProductsService {
  async createProduct(newProduct: CreateProduct, images: FileUrl[]) {
    const imagesName: string[] =
      (await this.chargeListProductFile(images)) ?? [];

    const product: CreateProduct = { images: imagesName, ...newProduct };

    return this.http.post(this.URL + `products/`, product).pipe(
      map((resp) => resp),
      catchError((error: any) => {
        console.log(error);

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

  activeProduct(idSlug: string) {
    return this.http.get<Product>(this.URL + `products/${idSlug}/active`).pipe(
      map((resp) => resp),
      catchError((error: any) => {
        throw new Error(
          'It was not possible active product. Please try again later.'
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
