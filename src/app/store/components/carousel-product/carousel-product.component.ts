import { Component, Input, signal } from '@angular/core';
import { ImageProduct } from '../../interfaces/images-products.interface';

@Component({
  selector: 'shared-carousel-product',
  standalone: true,
  imports: [],
  templateUrl: './carousel-product.component.html',
  styleUrl: './carousel-product.component.scss',
})
export class CarouselProductComponent {
  @Input() images: ImageProduct[] = [];
  @Input() urlPage = '';

  currentImageIndex = signal(0);

  changeImage(index: number) {
    this.currentImageIndex.set(index);
  }
}
