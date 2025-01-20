import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  goRoute(key: string) {
    switch (key) {
      case 'git':
        window.open('https://github.com/Dastah', '_blank');
        break;
      case 'pen':
        window.open('https://codepen.io/ponchh', '_blank');
        break;
      case 'lin':
        window.open('https://www.linkedin.com/in/alfonsomlwork/', '_blank');
        break;
      default:
        break;
    }
  }
}
