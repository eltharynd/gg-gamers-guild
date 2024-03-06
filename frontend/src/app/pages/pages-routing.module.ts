import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LayoutComponent } from '../shared/components/layout/layout.component'
import { AuthGuard } from '../shared/guards/auth.guard'
import { AboutComponent } from './about/about.component'
import { EventsComponent } from './events/events.component'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'events', component: EventsComponent },
      {
        path: 'admin',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../admin/admin.module').then((m) => m.AdminModule),
        pathMatch: 'prefix',
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
