import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LayoutComponent } from './shared/components/layout/layout.component'
import { NotFoundComponent } from './shared/components/not-found/not-found.component'
import { AuthGuard } from './shared/guards/auth.guard'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
        pathMatch: 'prefix',
      },
      {
        path: 'admin',
        canActivateChild: [AuthGuard],
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        pathMatch: 'prefix',
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
    pathMatch: 'prefix',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
