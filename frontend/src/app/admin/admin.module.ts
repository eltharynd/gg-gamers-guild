import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { AdminRoutingModule } from './admin-routing.module'
import { EventsComponent } from './events/events.component'

@NgModule({
  declarations: [EventsComponent],
  imports: [SharedModule, AdminRoutingModule],
})
export class AdminModule {}
