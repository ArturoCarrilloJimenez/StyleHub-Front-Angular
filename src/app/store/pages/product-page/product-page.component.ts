import { Component, signal } from '@angular/core';
import { ProductResponse } from '../../interfaces/product-response.interface';
import { ProductsService } from '../../products.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { LoadingCardComponent } from '../../../shared/components/loading/loading.component';
import { InitImageProductsComponent } from '../../components/init-image-products/init-image-products.component';

@Component({
  selector: 'app-product-page',
  imports: [ProductCardComponent, LoadingCardComponent, InitImageProductsComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  products = signal<ProductResponse[]>([]);
  isLoading = signal(true);

  constructor(private readonly productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(() => {
      this.products.set(this.productsService.products());
      this.isLoading.set(false);
    });
  }
}
