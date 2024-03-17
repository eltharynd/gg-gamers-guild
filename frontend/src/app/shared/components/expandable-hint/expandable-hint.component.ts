import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-expandable-hint',
  templateUrl: './expandable-hint.component.html',
  styleUrl: './expandable-hint.component.scss',
  animations: [
    trigger('expansion', [
      state('true', style({ opacity: 1, 'max-height': '36rem' })),
      state('false', style({ opacity: 0, 'max-height': 0 })),
      transition(
        'false => true',
        animate(
          '750ms ease',
          keyframes([
            style({ opacity: 0, 'max-height': 0, overflow: 'hidden' }),
            style({ opacity: 0.3, 'max-height': '18rem', overflow: 'hidden' }),
            style({ opacity: 1, 'max-height': '36rem', overflow: 'hidden' }),
          ])
        )
      ),
      transition(
        'true => false',
        animate(
          '750ms ease',
          keyframes([
            style({ opacity: 1, 'max-height': '36rem', overflow: 'hidden' }),
            style({ opacity: 0.7, 'max-height': '18rem', overflow: 'hidden' }),
            style({ opacity: 0, 'max-height': 0, overflow: 'hidden' }),
          ])
        )
      ),
    ]),
  ],
})
export class ExpandableHintComponent {
  @Input('title') title: string
  @Input('content') content: string
  @Input('innerHTML') innerHTML: string

  @Input('expanded') expanded: boolean = false
}
