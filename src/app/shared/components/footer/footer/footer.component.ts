import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environments';

@Component({
  selector: 'shared-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  yearCopyright = new Date().getFullYear();
  title = environment.title
}
