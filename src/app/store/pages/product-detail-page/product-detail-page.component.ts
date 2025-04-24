import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../products.service';
import { CommonModule } from '@angular/common';
import { LoadingCardComponent } from '../../../shared/components/loading/loading.component';
import { CarouselProductComponent } from '../../components/carousel-product/carousel-product.component';
import { ImageProduct } from '../../interfaces/images-products.interface';
import { environment } from '../../../../environments/environments';
import { isNewProduct } from '../../utils/new-product.util';
import { AuthService } from '../../../auth/auth.service';
import { CartService } from '../../cart/cart.service';
import { Product } from '../../interfaces/product-response.interface';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [CommonModule, LoadingCardComponent, CarouselProductComponent],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss',
})
export class ProductDetailPageComponent {
  private readonly route = inject(ActivatedRoute);

  private readonly base = environment.baseUrl;
  private idSlug = signal(this.route.snapshot.params['idSlug']);
  isLoad = signal(true);
  product = signal<Product | null>(null);

  images = computed<ImageProduct[]>(() => {
    return this.product() != null
      ? this.product()!.images.map((image) => {
          return {
            url: `${this.base}files/product/${image}`,
            alt: this.product()!.slug,
          };
        })
      : [];
  });

  isNewProduct = computed<boolean>(() =>
    this.product != null ? isNewProduct(this.product()!.insertDate) : false
  );

  constructor(
    private readonly productService: ProductsService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly cartService: CartService
  ) {
    this.route.params.subscribe((params) => {
      this.idSlug.set(params['idSlug']);
      this.chargeProduct()
    });
  }

  chargeProduct() {
    this.productService.getOneProduct(this.idSlug()).subscribe({
      next: (item) => {
        this.product.set(item);
        this.isLoad.set(false);
      },
      error: () => {
        this.router.navigateByUrl('/products');
      },
    });
  }

  addCart(id: string) {
    if (this.authService.authStatus() !== 'authenticated') {
      this.router.navigateByUrl('/auth/login');
      return;
    }

    this.cartService.setProduct(id).subscribe();
  }
}
