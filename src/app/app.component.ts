import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollService } from './utils/services/reset-scroll.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {
    AOS.init();
  }
}
