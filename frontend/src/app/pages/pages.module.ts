import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { AboutComponent } from './about/about.component'
import { EventComponent } from './events/event/event.component'
import { EventsComponent } from './events/events.component'
import { HomeComponent } from './home/home.component'
import { PagesRoutingModule } from './pages-routing.module'
import { PrivacyComponent } from './privacy/privacy.component'
import { TermsComponent } from './terms/terms.component'

@NgModule({
  declarations: [
    AboutComponent,
    EventComponent,
    EventsComponent,
    HomeComponent,
    PrivacyComponent,
    TermsComponent,
  ],
  imports: [SharedModule, PagesRoutingModule],
})
export class PagesModule {}
