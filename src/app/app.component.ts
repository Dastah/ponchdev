import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BannerComponent } from './features/banner/banner.component';
import { FinderComponent } from "./features/finder/finder.component";
import { IntroComponent } from "./features/intro/intro.component";
import { StackComponent } from './features/stack/stack.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, BannerComponent, FinderComponent, IntroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  showIntro: boolean = true;
  title: any;

  ngOnInit() {
    this.introTimer();
  }

  introTimer() {
    setTimeout(() => {
      this.showIntro = false;
    }, 2000);
  }
}
