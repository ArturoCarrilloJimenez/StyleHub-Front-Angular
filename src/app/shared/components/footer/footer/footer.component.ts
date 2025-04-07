import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environments';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { aspectsSocialTwitter, aspectsSocialFacebook, aspectsSocialInstagram } from '@ng-icons/ux-aspects';

@Component({
  selector: 'shared-footer',
  standalone: true,
  imports: [NgIcon],
  viewProviders: [
    provideIcons({
      aspectsSocialTwitter,
      aspectsSocialFacebook,
      aspectsSocialInstagram,
    }),
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  yearCopyright = new Date().getFullYear();
  title = environment.title;
}
