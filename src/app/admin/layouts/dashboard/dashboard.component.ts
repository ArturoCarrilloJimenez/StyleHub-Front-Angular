import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../../shared/components/footer/footer/footer.component";
import { NavbarAdminComponent } from "../../components/navbar-admin/navbar-admin.component";

@Component({
  selector: 'admin-navbar-dashboard',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarAdminComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardAdminComponent {

}
