import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import axios from 'axios';
import { Router } from "@angular/router";
import { AppRoutes } from "../../../app.routes.enum";

@Component({
  selector: 'app-form-forgot-password',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './form-forgot-password.component.html',
  styleUrl: './form-forgot-password.component.scss'
})
export class FormForgotPasswordComponent {
  email = '';
  errorMessage = '';
  successMessage = '';

  constructor(private router: Router) { }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  async resetPassword() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.email) {
      this.errorMessage = 'Proszę podać adres email';
      return;
    }

    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'Proszę podać poprawny adres email';
      return;
    }

    try {
      await axios.post('http://localhost:4000/reset-password', {
        email: this.email
      });

      this.successMessage = 'Link do resetowania hasła został wysłany na podany adres email';

      // Po 3 sekundach przekieruj do strony logowania
      setTimeout(() => {
        this.router.navigateByUrl(AppRoutes.AUTHENTICATOR);
      }, 3000);
    } catch (error: any) {
      console.error('Błąd resetowania hasła:', error);
      this.errorMessage = error.response?.data?.error || 'Wystąpił błąd podczas wysyłania linku resetującego hasło';
    }
  }

  backToLogin() {
    this.router.navigateByUrl(AppRoutes.AUTHENTICATOR).then(r => {});
  }
}
