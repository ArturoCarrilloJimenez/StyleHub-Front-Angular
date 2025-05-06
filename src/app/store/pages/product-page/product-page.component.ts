import { Component, computed, signal } from '@angular/core';
import { ProductsResponse } from '../../interfaces/product-response.interface';
import { StoreProductsService } from '../../store.service';
import {
  ProductCardComponent,
  InitImageProductsComponent,
} from '../../components/';
import { LoadingCardComponent } from '../../../shared/components/loading/loading.component';
import { PaginateComponent } from '../../../shared/components/paginate/paginate.component';
@Component({
  selector: 'app-product-page',
  imports: [
    ProductCardComponent,
    LoadingCardComponent,
    InitImageProductsComponent,
    PaginateComponent,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  products = computed<ProductsResponse | null>(() => this.productsService.products());
  isLoading = signal(true);

  constructor(private readonly productsService: StoreProductsService) {}

  ngOnInit(): void {
    this.chargeProduct();
  }

  chargeProduct(page: number = 1, limit: number = 12) {
    this.isLoading = signal(true);
    this.productsService.getProducts(limit, page).subscribe(() => {
      this.isLoading.set(false);
    });
  }
}
