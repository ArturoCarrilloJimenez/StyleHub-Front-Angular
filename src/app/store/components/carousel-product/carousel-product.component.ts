import { Component, Input } from '@angular/core';
import { ImageProduct } from '../../interfaces/images-products.interface';
import { LazyImage } from "../../../shared/components/lezyImage/lezyImage.component";

@Component({
  selector: 'shared-carousel-product',
  standalone: true,
  imports: [LazyImage],
  templateUrl: './carousel-product.component.html',
  styleUrl: './carousel-product.component.scss',
})
export class CarouselProductComponent {
  @Input() images: ImageProduct[] = [];
}
