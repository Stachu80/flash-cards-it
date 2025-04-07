import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import axios from 'axios';
import { Router, ActivatedRoute } from "@angular/router";
import { AppRoutes } from "../../../app.routes.enum";

@Component({
    selector: 'app-form-reset-password',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './form-reset-password.component.html',
    styleUrl: './form-reset-password.component.scss'
})
export class FormResetPasswordComponent implements OnInit {
    password = '';
    confirmPassword = '';
    errorMessage = '';
    successMessage = '';
    token = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.token = this.route.snapshot.params['token'];
        if (!this.token) {
            this.errorMessage = 'Nieprawidłowy token resetowania hasła';
        }
    }

    validatePasswords(): boolean {
        return this.password === this.confirmPassword && this.password.length >= 6;
    }

    async resetPassword() {
        this.errorMessage = '';
        this.successMessage = '';

        if (!this.validatePasswords()) {
            if (this.password.length < 6) {
                this.errorMessage = 'Hasło musi mieć co najmniej 6 znaków';
            } else {
                this.errorMessage = 'Hasła nie są identyczne';
            }
            return;
        }

        try {
            await axios.post(`http://localhost:4000/reset-password/${this.token}`, {
                password: this.password
            });

            this.successMessage = 'Hasło zostało pomyślnie zmienione';

            // Po 3 sekundach przekieruj do strony logowania
            setTimeout(() => {
                this.router.navigateByUrl(AppRoutes.AUTHENTICATOR);
            }, 3000);
        } catch (error: any) {
            console.error('Błąd resetowania hasła:', error);
            this.errorMessage = error.response?.data?.error || 'Wystąpił błąd podczas resetowania hasła';
        }
    }
}
