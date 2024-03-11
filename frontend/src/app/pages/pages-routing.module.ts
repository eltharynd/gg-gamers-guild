import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AboutComponent } from './about/about.component'
import { EventComponent } from './events/event/event.component'
import { EventsComponent } from './events/events.component'
import { HomeComponent } from './home/home.component'
import { PrivacyComponent } from './privacy/privacy.component'
import { TermsComponent } from './terms/terms.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },

  { path: 'events', component: EventsComponent },
  { path: 'events/:eventId', component: EventComponent },

  { path: 'privacy-policy', component: PrivacyComponent },
  { path: 'terms-and-conditions', component: TermsComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
