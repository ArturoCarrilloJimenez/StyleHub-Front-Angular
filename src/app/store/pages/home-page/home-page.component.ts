import { Component, OnInit, signal } from '@angular/core';
import { InitialImageHomeComponent } from '../../components/initial-image-home/initial-image-home.component';
import { ProductsService } from '../../products.service';
import { ProductsResponse } from '../../interfaces/product-response.interface';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { LoadingCardComponent } from '../../../shared/components/loading/loading.component';
import { RouterLink } from '@angular/router';
import { InformativeCompositionHomeComponent } from '../../components/informative-composition-home/informative-composition-home.component';

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

  constructor(private readonly productsService: ProductsService) {}

  ngOnInit(): void {
    this.products.set(this.productsService.products());

    if (this.products() == null)
      this.productsService.getProducts(4).subscribe(() => {
        this.products.set(this.productsService.products());
        this.isLoading.set(false);
      });
    else this.isLoading.set(false);
  }
}
