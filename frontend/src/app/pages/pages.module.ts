import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { EventsComponent } from './events/events.component'
import { HomeComponent } from './home/home.component'
import { PagesLayoutComponent } from './layout/layout.component'
import { PagesRoutingModule } from './pages-routing.module'

@NgModule({
  declarations: [PagesLayoutComponent, HomeComponent, EventsComponent],
  imports: [SharedModule, PagesRoutingModule],
})
export class PagesModule {}
