import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthButtonsComponent } from './navbar/components/auth-buttons/auth-buttons.component';
import { NavbarContainerComponent } from "./navbar/containers/navbar-container/navbar-container.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'flash-cards-it';
}
