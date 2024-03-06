import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '../shared/guards/auth.guard'
import { EventsComponent } from './events/events.component'

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', canActivate: [AuthGuard], component: EventsComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
