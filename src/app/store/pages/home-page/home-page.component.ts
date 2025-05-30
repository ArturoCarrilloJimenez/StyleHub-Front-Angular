import { Component, OnInit, signal } from '@angular/core';
import { StoreProductsService } from '../../store.service';
import {
  InitialImageHomeComponent,
  ProductCardComponent,
  InformativeCompositionHomeComponent,
} from '../../components/';
import { ProductsResponse } from '../../interfaces/product-response.interface';
import { RouterLink } from '@angular/router';
import { SkeletonCartComponent } from '../../../shared/components/skeleton-cart/skeleton-cart.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    InitialImageHomeComponent,
    ProductCardComponent,
    RouterLink,
    InformativeCompositionHomeComponent,
    SkeletonCartComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  products = signal<ProductsResponse | null>(null);
  isLoading = signal(true);

  skeletonArray = Array.from({ length: 4 });

  constructor(private readonly productsService: StoreProductsService) {}

  ngOnInit(): void {
    this.products.set(this.productsService.products());

    if (this.products() == null)
      this.productsService.getProducts({ limit: 4 }).subscribe({
        next: () => {
          this.products.set(this.productsService.products());
          this.isLoading.set(false);
        },
        error: () => this.isLoading.set(false),
      });
    else this.isLoading.set(false);
  }
}
