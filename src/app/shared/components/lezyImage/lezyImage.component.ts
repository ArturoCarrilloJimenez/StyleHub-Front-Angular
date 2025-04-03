import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { delay } from 'rxjs';

@Component({
  selector: 'shared-lazy-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'lazyImage.component.html',
})
export class LazyImage implements OnInit {
  constructor() {}
  protected hasLoads = signal(false)

  @Input() public url!: string;
  @Input() public alterText!: string;

  ngOnInit(): void {
    if (!this.url) throw new Error('URL property is required')
  }


  onLoad () {
    this.hasLoads.set(true)
  }
}

