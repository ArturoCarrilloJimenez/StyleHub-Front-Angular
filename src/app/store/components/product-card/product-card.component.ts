import { Component, Input, OnInit } from '@angular/core';
import { ProductResponse } from '../../interfaces/product-response.interface';
import { environment } from '../../../../environments/environments';
import { LazyImage } from "../../../shared/components/lezyImage/lezyImage.component";
import { LimitCharacterTextPipe } from '../../../shared/pipes/limit-character-text.pipe';

@Component({
  selector: 'shop-product-card',
  standalone: true,
  imports: [LazyImage, LimitCharacterTextPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {
  private base = environment.baseUrl

  @Input() product!: ProductResponse

  ngOnInit(): void {
    this.product.images = this.product.images.map(
      (image) => `${this.base}files/product/${image}`
    );
  }
}
