import { Component, OnInit, signal } from '@angular/core';
import { InitialImageHomeComponent } from '../../components/initial-image-home/initial-image-home.component';
import { ProductsService } from '../../products.service';
import { ProductResponse } from '../../interfaces/product-response.interface';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { LoadingCardComponent } from "../../../shared/components/loading/loading.component";
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    InitialImageHomeComponent,
    ProductCardComponent,
    LoadingCardComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  products = signal<ProductResponse[]>([]);
  isLoading = signal(true);

  constructor(private readonly productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(() => {
      this.products.set(this.productsService.products());
      this.isLoading.set(false)
    });
  }
}
