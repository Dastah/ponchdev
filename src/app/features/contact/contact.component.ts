import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  show = false;
  sending = false;
  sent = false;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.show = true;
    }, 10);
  }

  formData = {
    firstname: '',
    email: '',
    subject: '',
  };

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  sendForm(event: Event) {
    if (
      !this.formData.firstname ||
      !this.formData.email ||
      !this.formData.subject
    ) {
      alert('Please fill in all fields.');
      return;
    }

    if (!this.validateEmail(this.formData.email)) {
      alert('Invalid email format.');
      return;
    }
    this.sending = true;
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const statusMessage = document.getElementById(
      'statusMessage'
    ) as HTMLElement;

    const formData = new FormData(form);

    fetch('https://formspree.io/f/xannkzaw', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          setTimeout(() => {
            this.sending = false;
            this.sent = true;
          }, 2000);
          setTimeout(() => {
            form.reset();
            this.downloadCv();
          }, 2000);
        } else {
          throw new Error('Error en el envío del formulario');
        }
      })
      .catch(() => {});
  }

  downloadCv(): void {
    const a = document.createElement('a');
    a.href = 'alfonsomlCV2024.pdf';
    a.download = 'alfonsoCV2024.pdf';
    a.click();
  }
}
