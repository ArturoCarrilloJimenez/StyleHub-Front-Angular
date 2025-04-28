import { Component, computed, inject, Input, signal } from '@angular/core';
import { Product } from '../../../store/interfaces/product-response.interface';
import { environment } from '../../../../environments/environments';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';


@Component({
  selector: 'admin-product-card',
  standalone: true,
  imports: [CommonModule, NgIcon],
  viewProviders: [provideIcons({ heroTrash, heroPencilSquare })],
  templateUrl: './product-admin.component.html',
  styleUrl: './product-admin.component.scss',
})
export class ProductAdminComponent {
  private base = environment.baseUrl;

  @Input() product!: Product;

  images = computed<string[]>(() =>
    this.product.images.map((image) => {
      return `${this.base}files/product/${image}`;
    })
  );

  deleteProduct(id: string) {
    throw new Error('Method not implemented.');
  }

  editProduct(id: string) {
    throw new Error('Method not implemented.');
  }
}
