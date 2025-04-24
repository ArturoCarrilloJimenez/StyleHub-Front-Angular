import {
  Component,
  computed,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Product } from '../../interfaces/product-response.interface';
import { environment } from '../../../../environments/environments';
import { LimitCharacterTextPipe } from '../../../shared/pipes/limit-character-text.pipe';
import { CarouselProductComponent } from '../carousel-product/carousel-product.component';
import { ImageProduct } from '../../interfaces/images-products.interface';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { CartService } from '../../cart/cart.service';
import { isNewProduct } from '../../utils/new-product.util';

@Component({
  selector: 'shop-product-card',
  standalone: true,
  imports: [
    LimitCharacterTextPipe,
    CarouselProductComponent,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  private base = environment.baseUrl;

  @Input() product!: Product;
  @Input() urlPage = '';

  images = computed<ImageProduct[]>(() =>
    this.product.images.map((image) => {
      return {
        url: `${this.base}files/product/${image}`,
        alt: this.product.slug,
      };
    })
  );

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly cartService: CartService
  ) {}

  isNewProduct() {
    return isNewProduct(this.product.insertDate);
  }

  addCart(id: string) {
    if (this.authService.authStatus() !== 'authenticated') {
      this.router.navigateByUrl('/auth/login');
      return;
    }

    this.cartService.setProduct(id).subscribe();
  }
}
