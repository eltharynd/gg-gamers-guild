import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { HomeComponent } from './home/home.component'
import { PagesRoutingModule } from './pages-routing.module'

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, PagesRoutingModule],
})
export class PagesModule {}
