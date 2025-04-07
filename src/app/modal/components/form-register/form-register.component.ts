import { Component, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import axios from 'axios';
import { Router } from "@angular/router";
import { AppRoutes } from "../../../app.routes.enum";

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.scss'
})
export class FormRegisterComponent {
  email = '';
  name = '';
  surname = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private router: Router) {
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  validatePasswords(): boolean {
    return this.password === this.confirmPassword && this.password.length >= 6;
  }

  validateName(name: string): boolean {
    return name.trim().length >= 2;
  }

  validateSurname(surname: string): boolean {
    return surname.trim().length >= 2;
  }

  async register() {
    this.errorMessage = '';

    if (!this.validateName(this.name)) {
      this.errorMessage = 'Imię musi mieć co najmniej 2 znaki';
      return;
    }

    if (!this.validateSurname(this.surname)) {
      this.errorMessage = 'Nazwisko musi mieć co najmniej 2 znaki';
      return;
    }

    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'Proszę podać poprawny adres email';
      return;
    }

    if (!this.validatePasswords()) {
      if (this.password.length < 6) {
        this.errorMessage = 'Hasło musi mieć co najmniej 6 znaków';
      } else {
        this.errorMessage = 'Hasła nie są identyczne';
      }
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/register', {
        username: this.name + " " + this.surname,
        email: this.email,
        password: this.password,
      });

      // Po udanej rejestracji przekieruj do strony logowania
      this.router.navigateByUrl(AppRoutes.AUTHENTICATOR);
    } catch (error: any) {
      console.error('Błąd rejestracji:', error);
      this.errorMessage = error.response?.data?.error || 'Wystąpił błąd podczas rejestracji';
    }
  }
}
