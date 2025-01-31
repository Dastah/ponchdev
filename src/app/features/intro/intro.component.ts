import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  imports: [CommonModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent {
  isStylesLoaded = false;
  ngOnInit(): void {
    setTimeout(() => {
      this.isStylesLoaded = true;
    }, 100);
  }
}
