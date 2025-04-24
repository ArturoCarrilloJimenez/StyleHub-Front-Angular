import { Component, computed, OnInit, signal } from '@angular/core';
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
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [CommonModule, LoadingCardComponent, CarouselProductComponent],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss',
})
export class ProductDetailPageComponent {
  private readonly base = environment.baseUrl;
  private idSlug = '';
  isLoad = signal(true);

  images = computed<ImageProduct[]>(() => {
    return this.product.value() != null
      ? this.product.value()!.images.map((image) => {
          return {
            url: `${this.base}files/product/${image}`,
            alt: this.product.value()!.slug,
          };
        })
      : [];
  });

  isNewProduct = computed<boolean>(() =>
    this.product != null
      ? isNewProduct(this.product.value()!.insertDate)
      : false
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductsService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly cartService: CartService
  ) {
    this.route.params.subscribe((params) => {
      this.idSlug = params['idSlug'];
    });
  }

  product = rxResource({
    request: () => ({ idSlug: this.idSlug }),
    loader: ({ request }) => {
      return this.productService.getOneProduct(request.idSlug);
    },
  });

  addCart(id: string) {
    if (this.authService.authStatus() !== 'authenticated') {
      this.router.navigateByUrl('/auth/login');
      return;
    }

    this.cartService.setProduct(id).subscribe();
  }
}
