import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-login',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent {
  email = '';
  password = '';
  loginData = output<{
    email: string,
    password: string,
  }>()

  login() {
    this.loginData.emit({
      email: this.email,
      password: this.password,
    });
  }
}
