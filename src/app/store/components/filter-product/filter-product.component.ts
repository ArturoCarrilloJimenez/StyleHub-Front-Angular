import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroAdjustmentsHorizontalMini } from '@ng-icons/heroicons/mini';
import { GetProductParam } from '../../interfaces/get-product-params.interface';
import { FormUtils } from '../../../utils/form-utils';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { heroMagnifyingGlassCircleSolid } from '@ng-icons/heroicons/solid';
import { StoreProductsService } from '../../store.service';
import { TypeProductResponse } from '../../interfaces/product-type.interface';
import { GENDERS } from '../../cart/interfaces/product-detail.interface';

@Component({
  selector: 'store-filter-product',
  standalone: true,
  imports: [CommonModule, NgIcon, FormsModule, ReactiveFormsModule],
  viewProviders: [
    provideIcons({
      heroAdjustmentsHorizontalMini,
      heroMagnifyingGlassCircleSolid,
    }),
  ],
  templateUrl: './filter-product.component.html',
  styleUrl: './filter-product.component.scss',
})
export class FilterProductComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Output() filtersEmitter = new EventEmitter<GetProductParam>();

  hasError = signal<boolean>(false);

  formUtils = FormUtils;
  types: TypeProductResponse[] = [];

  filtersForm: FormGroup = this.fb.group(
    {
      search: [''],
      types: [[]],
      genders: [[]],
      minPrice: [0],
      maxPrice: [100000],
    },
    {
      validators: [this.formUtils.minNotGreaterThanMax('minPrice', 'maxPrice')],
    }
  );

  genders = GENDERS;

  // Variables para abrir y cerrar menus
  colapseValues = {
    isTypesOpen: signal(false),
    isGenderOpen: signal(false),
  };

  constructor(private readonly storeProductService: StoreProductsService) {}

  ngOnInit(): void {
    this.storeProductService
      .getAllCategory()
      .subscribe((types) => (this.types = types));
  }

  saveFilters() {
    this.filtersForm.markAllAsTouched();

    if (this.filtersForm.valid)
      this.filtersEmitter.emit(this.filtersForm.value);
  }

  clearFilter() {
    this.filtersForm.reset({
      search: '',
      types: [],
      genders: [],
      sizes: [],
      minPrice: [0],
      maxPrice: [100000],
    });

    this.colapseValues['isTypesOpen'].set(false);
    this.colapseValues['isGenderOpen'].set(false);
  }

  isSelectedValue(valueFind: string, key: string) {
    const valueSelected: string[] = this.filtersForm.controls[key].value;
    return !!valueSelected.find((value) => value == valueFind);
  }

  updateType(valueUpdate: string, kayForm: string) {
    const typesValue: string[] = this.filtersForm.controls[kayForm].value;
    this.isSelectedValue(valueUpdate, kayForm)
      ? this.filtersForm.controls[kayForm].setValue(
          typesValue.filter((value) => value !== valueUpdate)
        )
      : this.filtersForm.controls[kayForm].setValue([
          ...typesValue,
          valueUpdate,
        ]);
  }

  toggleCollapse(kay: keyof typeof this.colapseValues) {
    this.colapseValues[kay].set(!this.colapseValues[kay]());
  }
}
