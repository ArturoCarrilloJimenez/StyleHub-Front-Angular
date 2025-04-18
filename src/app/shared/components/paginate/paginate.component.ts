import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'shared-paginate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginate.component.html',
  styleUrl: './paginate.component.scss',
})
export class PaginateComponent implements OnInit {
  pages: number[] = [];

  @Input() lastPage: number | null = null;
  @Input() nextPage: number | null = null;
  @Input() prevPage: number | null = null;
  @Input() currentPage: number = 1;

  @Output()
  private emite = new EventEmitter<number>();

  ngOnInit(): void {
    if (this.lastPage) {
      for (let i = 0; i < this.lastPage; i++) {
        this.pages.push(i);
      }

      if (this.pages.length > 5) {
        this.pages.splice(this.currentPage + 2, this.pages.length, -1)

        if (this.currentPage > 3) {
        this.pages.splice(0, this.currentPage - 3, -1);

        }
      }
    }
  }

  sendPage(page: number | null) {
    if (page != null) this.emite.emit(page);
  }
}
