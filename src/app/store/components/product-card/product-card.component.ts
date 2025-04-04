import { Component, Input, OnInit, signal } from '@angular/core';
import { ProductResponse } from '../../interfaces/product-response.interface';
import { environment } from '../../../../environments/environments';
import { LimitCharacterTextPipe } from '../../../shared/pipes/limit-character-text.pipe';
import { CarouselProductComponent } from '../carousel-product/carousel-product.component';
import { ImageProduct } from '../../interfaces/images-products.interface';

@Component({
  selector: 'shop-product-card',
  standalone: true,
  imports: [LimitCharacterTextPipe, CarouselProductComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {
  private base = environment.baseUrl;
  images = signal<ImageProduct[]>([]);

  @Input() product!: ProductResponse;

  ngOnInit(): void {
    this.images.set(
      this.product.images.map((image) => {
        return {
          url: `${this.base}files/product/${image}`,
          alt: this.product.slug,
        };
      })
    );
  }
}
