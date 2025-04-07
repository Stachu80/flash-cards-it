import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppRoutes} from '../../../app.routes.enum';

@Component({
  selector: 'app-navbar-container',
  imports: [],
  templateUrl: './navbar-container.component.html',
  styleUrl: './navbar-container.component.scss'
})
export class NavbarContainerComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  showSingInModal = () => {
    this.router.navigateByUrl(AppRoutes.AUTHENTICATOR).then(r => {
    })
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
