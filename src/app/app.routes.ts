import { Routes } from '@angular/router';
import { AppRoutes } from './app.routes.enum';

export const routes: Routes = [
  {
    path: AppRoutes.HOME,
    loadComponent: () => import('./navbar/containers/navbar-container/navbar-container.component').then(m => m.NavbarContainerComponent),
  },
  {
    path: AppRoutes.AUTHENTICATOR,
    loadComponent: () => import('./modal/containers/modal-container/modal-container.component').then(m => m.ModalContainerComponent),
  },
  {
    path: AppRoutes.REGISTRATION,
    loadComponent: () => import('./modal/containers/modal-container/modal-container.component').then(m => m.ModalContainerComponent),
  },
  {
    path: AppRoutes.REGISTRATION,
    loadComponent: () => import('./modal/containers/modal-container/modal-container.component').then(m => m.ModalContainerComponent),
  },
  {
    path: AppRoutes.FORGOT_PASSWORD,
    loadComponent: () => import('./modal/components/form-forgot-password/form-forgot-password.component').then(m => m.FormForgotPasswordComponent),
  },
  { path: '**', redirectTo: '' }
];
