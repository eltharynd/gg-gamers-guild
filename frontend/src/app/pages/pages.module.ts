import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { AboutComponent } from './about/about.component'
import { EventComponent } from './events/event/event.component'
import { EventsComponent } from './events/events.component'
import { HomeComponent } from './home/home.component'
import { PagesRoutingModule } from './pages-routing.module'

@NgModule({
  declarations: [
    AboutComponent,
    EventComponent,
    EventsComponent,
    HomeComponent,
  ],
  imports: [SharedModule, PagesRoutingModule],
})
export class PagesModule {}
