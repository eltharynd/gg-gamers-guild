import { animate, style, transition, trigger } from '@angular/animations'
import { Component } from '@angular/core'
import { AuthGuard } from '../../guards/auth.guard'
import { POPIN } from '../../ui/animations'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('fromLeft', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(-15%)' }),
        animate('1500ms ease'),
      ]),
    ]),
    trigger('fromRight', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(15%)' }),
        animate('1500ms ease'),
      ]),
    ]),
    trigger('shrink', [
      transition('void => *', [
        style({ opacity: 0, transform: 'scale(2)' }),
        animate('1750ms ease'),
      ]),
    ]),
    POPIN,
  ],
})
export class HeaderComponent {
  constructor(public auth: AuthGuard) {}
}
