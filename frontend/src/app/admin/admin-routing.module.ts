import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { EventsComponent } from './events/events.component'

const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'events', component: EventsComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
