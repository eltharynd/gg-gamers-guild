import { animate, state, style, transition, trigger } from '@angular/animations'
import { Component } from '@angular/core'
import { AuthGuard } from '../../guards/auth.guard'
import { POPIN } from '../../ui/animations'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('fromLeft', [
      state(
        'true',
        style({
          transform: 'scale(0.95)',
          'transform-origin': 'right',
        })
      ),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(-15%)' }),
        animate('1250ms ease'),
      ]),
      transition('* <=> true', [animate('500ms ease')]),
    ]),
    trigger('fromRight', [
      state(
        'true',
        style({
          transform: 'scale(0.95)',
          'transform-origin': 'left',
        })
      ),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(15%)' }),
        animate('1250ms ease'),
      ]),
      transition('* <=> true', [animate('500ms ease')]),
    ]),
    trigger('shrink', [
      state('void', style({ opacity: 0, transform: 'scale(2)' })),
      state('true', style({ transform: 'scale(1.2)' })),
      transition('void => *', [animate('1750ms ease')]),
      transition('* <=> true', [animate('500ms ease')]),
    ]),
    POPIN,
  ],
})
export class HeaderComponent {
  hovering: boolean = false
  constructor(public auth: AuthGuard) {
    setInterval(() => console.log(this.hovering), 1000)
  }
}
