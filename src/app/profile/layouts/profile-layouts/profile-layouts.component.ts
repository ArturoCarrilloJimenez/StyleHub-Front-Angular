import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../../shared/components/navbar/navbar/navbar.component";

@Component({
  selector: 'app-profile-layouts',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './profile-layouts.component.html',
  styleUrl: './profile-layouts.component.scss'
})
export class ProfileLayoutsComponent {

}
