import {Component, computed, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {AppRoutes} from '../../../app.routes.enum';
import {CloseButtonComponent} from '../../../ui/close-button/close-button.component';
import {ModalFooterComponent} from '../../components/modal-footer/modal-footer.component';
import {ModalHeaderComponent} from '../../components/modal-header/modal-header.component';
import axios from 'axios'
import {FormLoginComponent} from '../../components/form-login/form-login.component';
import {FormRegisterComponent} from '../../components/form-register/form-register.component';


interface AxiosError {
  response?: {
    data: {
      error: string;
    };
  };
}

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, CloseButtonComponent, ModalFooterComponent, ModalHeaderComponent, FormLoginComponent, FormRegisterComponent]
})
export class ModalContainerComponent {
  isOpen = true;
  errorMessage: string = '';
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  readonly isLogin = computed(() => (this.route.routeConfig?.path ?? '') === AppRoutes.AUTHENTICATOR);

  handleLoginData(data: { email: string; password: string } | null) {
    data && this.login(data).then(r => {
    });
  }

  async login(data: { email: string, password: string }) {
    try {
      const response = await axios.post('http://localhost:4000/login', {
        email: data.email,
        password: data.password
      });
      localStorage.setItem('token', response.data.token);
      this.router.navigateByUrl(AppRoutes.HOME).then(r => {
      })
    } catch (error) {
      const axiosError = error as AxiosError; // Type assertion
      console.error('Błąd logowania:', axiosError);
      this.errorMessage = axiosError.response?.data?.error || 'Wystąpił błąd podczas logowania';
    }
  }
  onForgetPassword(){
    this.router.navigateByUrl(AppRoutes.FORGOT_PASSWORD).then(r => {
    })
  }

  switchToSignUp() {
    console.log('Switch to sign up clicked');
    this.router.navigateByUrl(AppRoutes.REGISTRATION).then(r => {
    })
  }

  switchToSignIn() {
    console.log('Switch to sign up clicked');
    this.router.navigateByUrl(AppRoutes.AUTHENTICATOR).then(r => {
    })
  }

  close() {
    this.isOpen = false;
    this.router.navigateByUrl(AppRoutes.HOME).then(r => {
    })
  }
}
