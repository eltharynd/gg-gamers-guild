import { Component, OnInit } from '@angular/core'
import { Event } from 'gg-gamers-guild-interfaces'
import { DataService } from '../../shared/services/data.service'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent implements OnInit {
  events: Event[]

  constructor(private data: DataService) {}

  async ngOnInit() {
    this.events = await this.data.get(`events`)
  }
}
