import { Component, computed, signal } from '@angular/core';
import { ProductsResponse } from '../../interfaces/product-response.interface';
import { StoreProductsService } from '../../store.service';
import {
  ProductCardComponent,
  InitImageProductsComponent,
} from '../../components/';
import { PaginateComponent } from '../../../shared/components/paginate/paginate.component';
import { FilterProductComponent } from '../../components/filter-product/filter-product.component';
import { GetProductParam } from '../../interfaces/get-product-params.interface';
import { SkeletonCartComponent } from "../../../shared/components/skeleton-cart/skeleton-cart.component";
@Component({
  selector: 'app-product-page',
  imports: [
    ProductCardComponent,
    InitImageProductsComponent,
    PaginateComponent,
    FilterProductComponent,
    SkeletonCartComponent,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  products = computed<ProductsResponse | null>(() =>
    this.productsService.products()
  );
  isLoading = signal(true);
  skeletonArray = Array.from({ length: 12 });

  constructor(private readonly productsService: StoreProductsService) {}

  ngOnInit(): void {
    this.chargeProduct();
  }

  chargeProduct(getProductsParam?: GetProductParam) {
    this.isLoading = signal(true);
    this.productsService
      .getProducts(getProductsParam ?? { limit: 12, page: 1 })
      .subscribe(() => {
        this.isLoading.set(false);
      });
  }
}
