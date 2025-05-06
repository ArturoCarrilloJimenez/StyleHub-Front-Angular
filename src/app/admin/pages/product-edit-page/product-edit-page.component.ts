import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { PaginateComponent } from '../../../shared/components/paginate/paginate.component';
import { ProductAdminComponent } from '../../components/product-admin/product-admin.component';
import { ProductEditService } from '../../product-edit.service';
import {
  Product,
  ProductsResponse,
} from '../../../store/interfaces/product-response.interface';
import { LoadingCardComponent } from '../../../shared/components/loading/loading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArchiveBoxSolid } from '@ng-icons/heroicons/solid';
import { EditProductFormComponent } from '../../components/edit-product-form/edit-product-form.component';

@Component({
  selector: 'app-product-edit-page',
  standalone: true,
  imports: [
    CommonModule,
    PaginateComponent,
    ProductAdminComponent,
    LoadingCardComponent,
    FormsModule,
    ReactiveFormsModule,
    EditProductFormComponent,
  ],
  viewProviders: [provideIcons({ heroArchiveBoxSolid })],
  templateUrl: './product-edit-page.component.html',
  styleUrl: './product-edit-page.component.scss',
})
export class ProductEditPageComponent {
  products = computed<ProductsResponse | null>(() =>
    this.productEditService.products()
  );
  product = signal<Product | null>(null);

  isActiveProduct = signal(true);
  isLoading = signal(true);
  isViewEditForm = signal(false);

  constructor(private readonly productEditService: ProductEditService) {}

  ngOnInit(): void {
    this.chargeProduct();
  }

  chargeProduct(page: number = 1, limit: number = 12) {
    this.isLoading = signal(true);
    this.productEditService
      .getProducts(limit, page, this.isActiveProduct())
      .subscribe(() => {
        this.isLoading.set(false);
      });
  }

  editProduct(idProduct: string) {
    this.productEditService.getOneProduct(idProduct).subscribe((product) => {
      this.product.set(product);
      this.isViewEditForm.set(true);
    });
  }

  viewActiveProduct() {
    this.isActiveProduct.set(!this.isActiveProduct());
    this.chargeProduct();
  }

  deleteProduct(id: string) {
    this.productEditService.deleteProduct(id).subscribe(() => {
      this.chargeProduct();
    });
  }

  activeProduct(id: string) {
    this.productEditService.activeProduct(id).subscribe(() => {
      this.chargeProduct();
    });
  }

  newProduct() {
    this.isViewEditForm.set(!this.isViewEditForm());
    this.product.set(null);
  }
}
