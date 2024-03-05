import { Component } from '@angular/core'
import { AuthGuard } from '../../shared/guards/auth.guard'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent {
  constructor(public auth: AuthGuard) {}
}
