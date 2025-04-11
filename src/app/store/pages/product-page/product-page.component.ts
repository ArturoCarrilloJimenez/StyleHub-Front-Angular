import { Component, signal } from '@angular/core';
import { ProductsResponse } from '../../interfaces/product-response.interface';
import { ProductsService } from '../../products.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { LoadingCardComponent } from '../../../shared/components/loading/loading.component';
import { InitImageProductsComponent } from '../../components/init-image-products/init-image-products.component';
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
  products = signal<ProductsResponse | null>(null);
  isLoading = signal(true);

  constructor(private readonly productsService: ProductsService) {}

  ngOnInit(): void {
    this.products.set(this.productsService.products());

    if (this.products() == null) this.chargeProduct();
    else this.isLoading.set(false);
  }

  chargeProduct(page: number = 1, limit: number = 12) {
      this.isLoading.set(true);

    this.productsService.getProducts(limit, page).subscribe(() => {
      this.products.set(this.productsService.products());
      this.isLoading.set(false);
    });
  }
}
