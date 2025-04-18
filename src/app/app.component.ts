import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollService } from './utils/services/reset-scroll.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private scrollService: ScrollService) {}
}
