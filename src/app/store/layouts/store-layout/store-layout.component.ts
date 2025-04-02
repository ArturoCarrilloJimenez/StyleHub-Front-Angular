import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar/navbar.component';

@Component({
  selector: 'app-store-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './store-layout.component.html',
  styleUrl: './store-layout.component.scss',
})
export class StoreLayoutComponent {}
