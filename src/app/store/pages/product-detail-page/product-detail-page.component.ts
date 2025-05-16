import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreProductsService } from '../../store.service';
import { CommonModule } from '@angular/common';
import { LoadingCardComponent } from '../../../shared/components/loading/loading.component';
import { CarouselProductComponent } from '../../components/carousel-product/carousel-product.component';
import { ImageProduct } from '../../interfaces/images-products.interface';
import { environment } from '../../../../environments/environments';
import { isNewProduct } from '../../utils/new-product.util';
import { AuthService } from '../../../auth/auth.service';
import { CartService } from '../../cart/cart.service';
import { Product } from '../../interfaces/product-response.interface';
import { ProductCart } from '../../cart/interfaces/cart.intreface';
import { ButtonAddCartComponent } from "../../../shared/components/button-add-cart/button-add-cart.component";
import { EditQuintityButtonsComponent } from "../../../shared/components/edit-quintity-buttons/edit-quintity-buttons.component";

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [CommonModule, LoadingCardComponent, CarouselProductComponent, ButtonAddCartComponent, EditQuintityButtonsComponent],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss',
})
// TODO intentar hacer que se actualize los detalles del carrito a tiempo real con el carrito desplegable
// Para esto usare el método getOneCartProduct del servicio CartService
export class ProductDetailPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  private readonly base = environment.baseUrl;

  private idSlug = signal(this.route.snapshot.params['idSlug']);
  isLoad = signal(true);

  product = signal<Product | null>(null);

  quantity = signal(1);
  sizeSelect = signal('');

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
    private readonly productService: StoreProductsService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idSlug.set(params['idSlug']);
      this.chargeProduct();
    });
  }

  addCart(id: string) {
    if (this.authService.authStatus() !== 'authenticated') {
      this.router.navigateByUrl('/auth/login');
      return;
    }

    this.cartService
      .setProduct(id, this.sizeSelect(), this.quantity())
      .subscribe();
  }

  chargeProduct() {
    this.productService.getOneProduct(this.idSlug()).subscribe({
      next: (item) => {
        this.product.set(item);
        this.isLoad.set(false);
        this.sizeSelect.set(item.sizes[0]);
      },
      error: () => {
        this.router.navigateByUrl('/products');
      },
    });
  }

  chargeProductCart() {
    console.log(this.cartService.getOneProductCart(this.product()?.id ?? ''));
  }
}
