import { Component, Input, LOCALE_ID, OnInit, signal } from '@angular/core';
import { ProductResponse } from '../../interfaces/product-response.interface';
import { environment } from '../../../../environments/environments';
import { LimitCharacterTextPipe } from '../../../shared/pipes/limit-character-text.pipe';
import { CarouselProductComponent } from '../carousel-product/carousel-product.component';
import { ImageProduct } from '../../interfaces/images-products.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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

  isNewProduct() {
    const dateInsert = new Date(this.product.insertDate).getTime();
    const newDate = new Date().getTime();
    const deferenceMillisecond = Math.abs(newDate - dateInsert);

    const days = Math.floor(deferenceMillisecond / (1000 * 60 * 60 * 24));

    return days <= 15 ? true : false;
  }

  addCart() {
    throw new Error('Método no implementado')
  }
}
