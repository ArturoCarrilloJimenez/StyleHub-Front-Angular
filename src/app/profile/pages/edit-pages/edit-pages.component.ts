import { Component } from '@angular/core';
import { DevPageComponent } from "../../../shared/pages/dev-page/dev-page.component";

@Component({
  selector: 'app-edit-pages',
  standalone: true,
  imports: [DevPageComponent],
  templateUrl: './edit-pages.component.html',
  styleUrl: './edit-pages.component.scss'
})
export class EditPagesComponent {
  // TODO realizar edición de usuario
}
