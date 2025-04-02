import { Component } from '@angular/core';
import { InitialImageHomeComponent } from "../../components/initial-image-home/initial-image-home.component";
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [InitialImageHomeComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
