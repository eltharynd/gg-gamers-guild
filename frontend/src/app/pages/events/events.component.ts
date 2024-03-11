import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations'
import { Component, OnInit } from '@angular/core'
import { AssignedEvent } from 'gg-gamers-guild-interfaces'
import { environment } from '../../../environments/environment'
import { DataService } from '../../shared/services/data.service'
import { POPIN } from '../../shared/ui/animations'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  animations: [
    POPIN,
    trigger('expansion', [
      state('true', style({ opacity: 1, 'max-height': '100vh' })),
      state('false', style({ opacity: 0, 'max-height': 0 })),
      transition(
        'false => true',
        animate(
          '750ms ease',
          keyframes([
            style({ opacity: 0, 'max-height': 0 }),
            style({ opacity: 0, 'max-height': '100vh' }),
            style({ opacity: 1, 'max-height': '100vh' }),
          ])
        )
      ),
      transition(
        'true => false',
        animate(
          '750ms ease',
          keyframes([
            style({ opacity: 1, 'max-height': '100vh' }),
            style({ opacity: 0, 'max-height': '100vh' }),
            style({ opacity: 0, 'max-height': 0 }),
          ])
        )
      ),
    ]),

    trigger('opacity', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('false <=> true', animate('1000ms ease')),
    ]),
  ],
})
export class EventsComponent implements OnInit {
  events: AssignedEvent[]

  pictureURL = `${environment.API_BASE_URL}uploads/`

  constructor(private data: DataService) {}

  async ngOnInit() {
    this.events = await this.data.get(`events`)
  }
}
