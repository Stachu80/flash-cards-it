import {Component, effect, input} from '@angular/core';

@Component({
  selector: 'app-modal-header',
  imports: [],
  templateUrl: './modal-header.component.html',
  styleUrl: './modal-header.component.scss'
})
export class ModalHeaderComponent {
  isLogin = input<boolean>();
  infoText = '';
  constructor() {
    effect(() => {
      this.infoText = this.isLogin() ? 'Please sign in to continue' : 'Please sign up to continue';
    });
  }

}
