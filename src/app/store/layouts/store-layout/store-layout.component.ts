import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-store-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './store-layout.component.html',
  styleUrl: './store-layout.component.scss',
})
export class StoreLayoutComponent {}
