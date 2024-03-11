import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AboutComponent } from './about/about.component'
import { EventComponent } from './events/event/event.component'
import { EventsComponent } from './events/events.component'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'events', component: EventsComponent },
  { path: 'events/:eventId', component: EventComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
