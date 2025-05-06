import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface Paginate {
  pageLength: number;
  nextPage: number | null;
  prevPage: number | null;
  currentPage: number;
}

@Component({
  selector: 'shared-paginate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginate.component.html',
  styleUrl: './paginate.component.scss',
})
export class PaginateComponent implements OnInit {
  pages: number[] = [];

  @Input() paginate!: Paginate;

  @Output()
  private emite = new EventEmitter<number>();

  ngOnInit(): void {
    if (this.paginate.pageLength) {
      for (let i = 0; i < this.paginate.pageLength; i++) {
        this.pages.push(i);
      }

      if (this.pages.length > 5) {
        this.pages.splice(this.paginate.currentPage + 2, this.pages.length, -1);

        if (this.paginate.currentPage > 3) {
          this.pages.splice(0, this.paginate.currentPage - 3, -1);
        }
      }
    }
  }

  sendPage(page: number | null) {
    if (page != null) this.emite.emit(page);
  }
}
