import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
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
import { TypeProductResponse } from '../../../store/interfaces/product-type.interface';
import { CommonModule } from '@angular/common';
import { CarouselProductComponent } from '../../../store/components/carousel-product/carousel-product.component';
import { ImageProduct } from '../../../store/interfaces/images-products.interface';
import { environment } from '../../../../environments/environments';
import {
  CreateProduct,
  FileUrl,
} from '../../interfaces/create-product.interface';
import {
  GENDERS,
  SIZES,
} from '../../../store/cart/interfaces/product-detail.interface';

@Component({
  selector: 'admin-edit-product-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselProductComponent,
  ],
  templateUrl: './edit-product-form.component.html',
  styleUrl: './edit-product-form.component.scss',
})
// Edit Product
export class EditProductFormComponent implements OnChanges, OnInit {
  private fb = inject(FormBuilder);
  private base = environment.baseUrl;

  @Input() productEdit: Product | null = null;
  @Output() editProductEmitter = new EventEmitter<boolean>();

  productEditImages = computed<ImageProduct[]>(() => {
    return this.productEdit != null
      ? this.productEdit!.images.map((image) => {
          return {
            url: `${this.base}files/product/${image}`,
            alt: this.productEdit!.slug,
          };
        })
      : [];
  });

  typeProduct = signal<TypeProductResponse[]>([]);
  gender = GENDERS;
  sizes = SIZES;

  formUtils = FormUtils;

  productForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    slug: [''],
    description: [''],

    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],

    sizes: [[]],
    type: ['', Validators.required],
    gender: ['', [Validators.required]],
  });
  productImages = signal<FileUrl[]>([]);

  error = signal<null | string>(null);

  constructor(private readonly productEditService: ProductEditService) {}

  ngOnInit(): void {
    this.productEditService.getAllCategory().subscribe((types) => {
      this.typeProduct.set(types);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productEdit']) {
      this.chargeProductEdit();
    }
  }

  chargeProductEdit() {
    if (this.productEdit) {
      this.productForm.setValue({
        title: this.productEdit.title ?? '',
        slug: this.productEdit.slug ?? '',
        description: this.productEdit.description ?? '',

        price: this.productEdit.price ?? 0,
        stock: this.productEdit.stock ?? 0,

        type: this.productEdit.type ?? '',
        sizes: this.productEdit.sizes ?? [],
        gender: this.productEdit.gender ?? '',
      });
    }
  }

  updateSize(sizeUpdate: string) {
    const sizesValue: string[] = this.productForm.controls['sizes'].value;
    this.findSize(sizeUpdate)
      ? this.productForm.controls['sizes'].setValue(
          sizesValue.filter((size) => size !== sizeUpdate)
        )
      : this.productForm.controls['sizes'].setValue([
          ...sizesValue,
          sizeUpdate,
        ]);
  }

  findSize(sizeFind: string) {
    const sizesValue: string[] = this.productForm.controls['sizes'].value;
    return !!sizesValue.find((size) => size == sizeFind);
  }

  onChangeImage(event: any) {
    const images: FileList = event.target.files;
    let productImages: FileUrl[] = [];

    for (const image of images) {
      if (image.type.split('/')[0] == 'image') {
        const url = URL.createObjectURL(image);
        productImages.push({ url, file: image });
      }
    }

    this.productImages.set(productImages);
  }

  async onSubmit() {
    if (this.productForm.valid) {
      const productValueForm: CreateProduct = this.productForm.value;
      const { slug, ...productValue } = productValueForm;

      if (productValue.sizes.length <= 0)
        this.error.set('Select one or more sizes');

      if (!this.error()) {
        const observableProduct =
          this.productEdit !== null
            ? await this.productEditService.editProduct(
                this.productEdit.id,
                { ...productValue, slug, images: this.productEdit.images },
                this.productImages()
              )
            : await this.productEditService.createProduct(
                productValue,
                this.productImages()
              );

        observableProduct.subscribe({
          next: () => {
            this.editProductEmitter.emit(false);
          },
          error: (error) => {
            this.error.set(error.message);
          },
        });

        setTimeout(() => {
          this.error.set(null);
        }, 10000);
      }
    }
  }
}
