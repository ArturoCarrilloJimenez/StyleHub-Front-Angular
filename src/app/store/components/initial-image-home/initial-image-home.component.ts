import { Component } from '@angular/core';
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'store-home-initial-image',
  standalone: true,
  imports: [],
  templateUrl: './initial-image-home.component.html',
  styleUrl: './initial-image-home.component.scss'
})
export class InitialImageHomeComponent {
  title = environment.title
}
