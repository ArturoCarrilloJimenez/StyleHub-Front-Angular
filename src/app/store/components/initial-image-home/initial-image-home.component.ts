import { Component } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'store-home-initial-image',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './initial-image-home.component.html',
  styleUrl: './initial-image-home.component.scss'
})
export class InitialImageHomeComponent {
  title = environment.title
}
