import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'button-group-edit-quantity',
  imports: [],
  templateUrl: './edit-quintity-buttons.component.html',
  styleUrl: './edit-quintity-buttons.component.scss',
})
export class EditQuintityButtonsComponent implements OnChanges {
  @Input() quantity: number = 0;
  @Input() stock: number = 0;
  @Input() isServerUpdate: boolean = false;

  @Output() changeQuantity = new EventEmitter<number>();

  quantityValue = signal(0);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['quantity']) this.quantityValue.set(this.quantity);
  }

  updateQuantity(addQuantity: boolean = true) {
    this.quantityValue.set(
      addQuantity ? this.quantityValue() + 1 : this.quantityValue() - 1
    );
    this.changeQuantity.emit(this.quantityValue());
  }
}
