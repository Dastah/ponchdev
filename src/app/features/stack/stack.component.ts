import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-stack',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.scss',
})
export class StackComponent {
  constructor() {}
  show = false;
  ngOnInit(): void {
    setTimeout(() => {
      this.show = true;
    }, 10);
  }
}
