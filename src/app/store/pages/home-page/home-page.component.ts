import { Component, OnInit, signal } from '@angular/core';
import { StoreProductsService } from '../../store.service';
import {
  InitialImageHomeComponent,
  ProductCardComponent,
  InformativeCompositionHomeComponent,
} from '../../components/';
import { ProductsResponse } from '../../interfaces/product-response.interface';
import { LoadingCardComponent } from '../../../shared/components/loading/loading.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    InitialImageHomeComponent,
    ProductCardComponent,
    LoadingCardComponent,
    RouterLink,
    InformativeCompositionHomeComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  products = signal<ProductsResponse | null>(null);
  isLoading = signal(true);

  constructor(private readonly productsService: StoreProductsService) {}

  ngOnInit(): void {
    this.products.set(this.productsService.products());

    if (this.products() == null)
      this.productsService.getProducts({ limit: 4 }).subscribe(() => {
        this.products.set(this.productsService.products());
        this.isLoading.set(false);
      });
    else this.isLoading.set(false);
  }
}
