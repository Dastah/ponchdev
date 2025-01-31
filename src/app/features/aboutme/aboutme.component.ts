import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutme',
  imports: [CommonModule],
  templateUrl: './aboutme.component.html',
  styleUrl: './aboutme.component.scss',
})
export class AboutmeComponent implements OnInit {
  birthDate: Date = new Date('1996-10-29');
  experienceStartDate: Date = new Date('2021-01-01');
  age: number = 0;
  experience: number = 0;
  show = false;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.show = true;
    }, 10);
    this.calculateAge();
    this.calculateExperience();
  }

  calculateAge(): void {
    const today = new Date();
    const ageDiff = today.getFullYear() - this.birthDate.getFullYear();
    const isBirthdayPassed =
      today.getMonth() > this.birthDate.getMonth() ||
      (today.getMonth() === this.birthDate.getMonth() &&
        today.getDate() >= this.birthDate.getDate());

    this.age = isBirthdayPassed ? ageDiff : ageDiff - 1;
  }

  calculateExperience(): void {
    const today = new Date();
    const experienceDiff =
      today.getFullYear() - this.experienceStartDate.getFullYear();
    const isExperienceAnniversaryPassed =
      today.getMonth() > this.experienceStartDate.getMonth() ||
      (today.getMonth() === this.experienceStartDate.getMonth() &&
        today.getDate() >= this.experienceStartDate.getDate());

    this.experience = isExperienceAnniversaryPassed
      ? experienceDiff
      : experienceDiff - 1;
  }
}
