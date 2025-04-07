import {Component, input} from '@angular/core';

@Component({
  selector: 'app-social-button',
  imports: [],
  templateUrl: './social-button.component.html',
  styleUrl: './social-button.component.scss'
})
export class SocialButtonComponent {
 iconSrc = input<string>('');
 text = input<string>('');
}
