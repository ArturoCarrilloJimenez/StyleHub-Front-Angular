import { Component, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { ProductCart } from '../../interfaces/cart.intreface';
import { environment } from '../../../../../environments/environments';
import { CommonModule } from '@angular/common';
import { LimitCharacterTextPipe } from '../../../../shared/pipes/limit-character-text.pipe';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroTrash } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'shop-cart-product',
  standalone: true,
  imports: [CommonModule, LimitCharacterTextPipe, NgIcon],
  viewProviders: [provideIcons({ heroTrash })],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.scss',
})
// TODO añadir la lógica del carrito
export class ProductCartComponent implements OnInit {
  private BASE = environment.baseUrl;
  urlImage = '';
  quantity = signal(0);


  @Input() product!: ProductCart;

  ngOnInit(): void {
    this.urlImage = `${this.BASE}files/product/${this.product.product.images[0]}`;
    this.quantity.set(this.product.quantity);
  }

  addOneToCart(idProduct: string) {
    this.quantity.set(this.quantity() + 1);
  }

  deleteOneToCart(idProduct: string) {
    this.quantity.set(this.quantity() - 1);
  }

  deleteProduct(idProduct: string) {
    console.log('producto eliminado');

  }
}
