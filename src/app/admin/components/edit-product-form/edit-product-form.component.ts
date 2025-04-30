import {
  Component,
  inject,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { ProductEditService } from '../../product-edit.service';
import { Product } from '../../../store/interfaces/product-response.interface';

@Component({
  selector: 'admin-edit-product-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-product-form.component.html',
  styleUrl: './edit-product-form.component.scss',
})
export class EditProductFormComponent implements OnChanges {
  private fb = inject(FormBuilder);

  @Input() productEdit: Product | null = null;

  hasError = signal<boolean>(false);

  formUtils = FormUtils;

  productForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0)]],
    description: [''],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [[]],
    type: ['', Validators.required],
    gender: ['', []],
    images: [[]],
  });

  constructor(private readonly productEditService: ProductEditService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['productEdit']
    ) {
      this.editProduct();
    }
  }

  editProduct() {
    if (this.productEdit) {
      this.productForm.setValue({
        title: this.productEdit.title ?? '',
        price: this.productEdit.price ?? 0,
        description: this.productEdit.description ?? '',
        stock: this.productEdit.stock ?? 0,
        sizes: this.productEdit.sizes ?? [],
        type: this.productEdit.type ?? '',
        gender: this.productEdit.gender ?? '',
        images: this.productEdit.images ?? [],
      });
    }
  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }
}
