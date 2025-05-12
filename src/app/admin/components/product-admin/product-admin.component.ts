import {
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Product } from '../../../store/interfaces/product-response.interface';
import { environment } from '../../../../environments/environments';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import { aspectsActive } from '@ng-icons/ux-aspects';

@Component({
  selector: 'admin-product-card',
  standalone: true,
  imports: [CommonModule, NgIcon],
  viewProviders: [provideIcons({ heroTrash, heroPencilSquare, aspectsActive })],
  templateUrl: './product-admin.component.html',
  styleUrl: './product-admin.component.scss',
})
export class ProductAdminComponent {
  private base = environment.baseUrl;

  @Input() product!: Product;
  @Output() editProductEmitter = new EventEmitter<string>();
  @Output() deleteProductEmitter = new EventEmitter<string>();
  @Output() activeProductEmitter = new EventEmitter<string>();

  images = computed<string[]>(() =>
    this.product.images.map((image) => {
      return `${this.base}files/product/${image}`;
    })
  );

  deleteProduct(id: string) {
    this.deleteProductEmitter.emit(id);
  }

  activeProduct(id: string) {
    this.activeProductEmitter.emit(id);
  }

  editProduct(id: string) {
    this.editProductEmitter.emit(id);
  }
}
