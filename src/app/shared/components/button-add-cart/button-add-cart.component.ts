import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'button-add-cart',
  imports: [CommonModule],
  templateUrl: './button-add-cart.component.html',
  styleUrl: './button-add-cart.component.scss',
})
export class ButtonAddCartComponent {
  btnAddCart = signal(false);
  addCart() {
    this.btnAddCart.set(true);
    setTimeout(() => this.btnAddCart.set(false), 3000);
  }
}
