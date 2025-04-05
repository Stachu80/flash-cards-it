import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ModalContainerComponent {
  isOpen = true;
  email = '';
  password = '';

  onSubmit() {
    if (this.email && this.password) {
      // TODO: Implement actual authentication logic
      console.log('Sign in attempt with:', { email: this.email });
    }
  }

  signInWithGoogle() {
    // TODO: Implement Google sign-in
    console.log('Google sign-in clicked');
  }

  signInWithGithub() {
    // TODO: Implement GitHub sign-in
    console.log('GitHub sign-in clicked');
  }

  switchToSignUp(event: Event) {
    event.preventDefault();
    // TODO: Implement switch to sign up view
    console.log('Switch to sign up clicked');
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
    this.email = '';
    this.password = '';
  }
}
