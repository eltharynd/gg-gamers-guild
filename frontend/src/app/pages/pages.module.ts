import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { AboutComponent } from './about/about.component'
import { EventsComponent } from './events/events.component'
import { HomeComponent } from './home/home.component'
import { PagesRoutingModule } from './pages-routing.module'

@NgModule({
  declarations: [HomeComponent, EventsComponent, AboutComponent],
  imports: [SharedModule, PagesRoutingModule],
})
export class PagesModule {}
