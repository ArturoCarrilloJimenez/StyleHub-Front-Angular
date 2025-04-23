import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'shared-dev-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dev-page.component.html',
  styleUrl: './dev-page.component.scss',
})
export class DevPageComponent {}
