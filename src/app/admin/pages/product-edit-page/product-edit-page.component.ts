import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { PaginateComponent } from '../../../shared/components/paginate/paginate.component';
import { ProductAdminComponent } from '../../components/product-admin/product-admin.component';
import { ProductEditService } from '../../product-edit.service';
import { ProductsResponse } from '../../../store/interfaces/product-response.interface';
import { LoadingCardComponent } from '../../../shared/components/loading/loading.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-product-edit-page',
  standalone: true,
  imports: [
    CommonModule,
    PaginateComponent,
    ProductAdminComponent,
    LoadingCardComponent,
  ],
  templateUrl: './product-edit-page.component.html',
  styleUrl: './product-edit-page.component.scss',
})
export class ProductEditPageComponent {
  private fb = inject(FormBuilder);

  products = computed<ProductsResponse | null>(() =>
    this.productEditService.products()
  );
  isActiveProduct = signal(true);
  isLoading = signal(true);
  isViewEditForm = signal(false);

  hasError = signal<boolean>(false);

  formUtils = FormUtils;

  productForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
  });

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
}
