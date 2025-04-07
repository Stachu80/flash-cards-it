import {Component, effect, input, output, OutputEmitterRef} from '@angular/core';

@Component({
  selector: 'app-modal-footer',
  imports: [],
  templateUrl: './modal-footer.component.html',
  styleUrl: './modal-footer.component.scss'
})
export class ModalFooterComponent {

  isLogin = input<boolean>();
  questionText = '';
  buttonText = '';
  forgotPasswordText = 'Forgot password?';
  onClick: OutputEmitterRef<void> = output<void>()
  onForgetPassword: OutputEmitterRef<void> = output<void>()

  constructor() {
    effect(() => {
      this.questionText = this.isLogin() ? 'Don\'t have an account?' : 'Already have an account?';
      this.buttonText = this.isLogin() ? 'Sign up' : 'Sign in';
    });
  }
  forgetPassword(event: Event){
    event.preventDefault();
    this.onForgetPassword.emit()
  }

  switch(event: Event) {
    event.preventDefault();
    this.onClick.emit()
  }
}
