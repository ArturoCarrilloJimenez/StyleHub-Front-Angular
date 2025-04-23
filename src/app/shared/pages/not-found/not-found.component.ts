import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'shared-not-found-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}
