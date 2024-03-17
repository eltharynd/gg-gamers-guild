import { SocialAuthService } from '@abacritt/angularx-social-login'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { ChangeDetectorRef, Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { AuthGuard } from '../../guards/auth.guard'
import { ViewportService } from '../../services/viewport.service'
import { POPIN } from '../../ui/animations'
import { UsernameDialogComponent } from '../username-dialog/username-dialog.component'

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
  mobile: boolean = false

  constructor(
    public auth: AuthGuard,
    private oauth: SocialAuthService,
    private viewport: ViewportService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
    this.oauth.authState.subscribe(async (user) => {
      if (user?.id) await this.auth.google(user)
    })

    this.auth.authenticatedUserChanges.subscribe(({ loggedIn, user }) => {
      if (
        loggedIn &&
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
          user.username
        )
      ) {
        this.dialog.open(UsernameDialogComponent, {
          data: { username: user.username },
        })
      }
    })

    viewport.viewPortChanges.subscribe(() => {
      this.mobile = this.viewport.width <= 600
      this.cdr.detectChanges()
    })
  }
}
