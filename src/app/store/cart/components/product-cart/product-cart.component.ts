import {
  Component,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { ProductCart } from '../../interfaces/cart.intreface';
import { environment } from '../../../../../environments/environments';
import { CommonModule } from '@angular/common';
import { LimitCharacterTextPipe } from '../../../../shared/pipes/limit-character-text.pipe';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroTrash } from '@ng-icons/heroicons/outline';
import { CartService } from '../../cart.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'shop-cart-product',
  standalone: true,
  imports: [CommonModule, LimitCharacterTextPipe, NgIcon, RouterLink, FormsModule],
  viewProviders: [provideIcons({ heroTrash })],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.scss',
})
export class ProductCartComponent implements OnInit {
  private BASE = environment.baseUrl;
  urlImage = '';
  quantity = signal(0);
  size = signal<string>('');

  timeoutId: any = null;
  isServerUpdate = signal(false);

  @Input() product!: ProductCart;

  constructor(private readonly cartService: CartService) {}

  ngOnInit(): void {
    this.urlImage = `${this.BASE}files/product/${this.product.product.images[0]}`;
    this.quantity.set(this.product.quantity);
    this.size.set(this.product.size);
  }

  updateProductCart(idProduct: string, isAddProduct: boolean = true) {
    this.quantity.set(isAddProduct ? this.quantity() + 1 : this.quantity() - 1);

    if (this.timeoutId !== null) clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
      if (this.quantity() <= 0) this.deleteProduct(idProduct);
      else {
        this.isServerUpdate.set(true);
        this.cartService
          .setProduct(idProduct, this.size(), this.quantity())
          .subscribe(() => this.isServerUpdate.set(false));
      }
    }, 750);
  }

  deleteProduct(idProduct: string) {
    this.isServerUpdate.set(true);
    this.cartService
      .deleteProduct(idProduct)
      .subscribe(() => this.isServerUpdate.set(false));
  }
}
