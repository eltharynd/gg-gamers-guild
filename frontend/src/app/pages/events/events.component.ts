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
    let events: AssignedEvent[] = await this.data.get(`events`)
    let today = new Date()
    today.setHours(0, 0, 0, 0)
    for (let e of events) {
      if (new Date(e.date).getTime() >= today.getTime()) {
        ;(e as any).expanded = true
      }
    }
    this.events = events
  }
}
