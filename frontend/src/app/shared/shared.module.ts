import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FooterComponent } from './components/footer/footer.component'
import { HeaderComponent } from './components/header/header.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { ToFormArrayPipe } from './pipes/formarray.pipe'
import { FormControlErrorsPipe } from './pipes/formcontrol-error.pipe'
import { ToFormGroupPipe } from './pipes/formgroup.pipe'
import { MaterialModule } from './ui/material.module'

const imports: any[] = [
  CommonModule,
  HttpClientModule,
  RouterModule,
  FontAwesomeModule,

  MaterialModule,
]

const declarations: any[] = [
  FooterComponent,
  HeaderComponent,
  NotFoundComponent,
]

const providers: any[] = [
  FormControlErrorsPipe,
  ToFormArrayPipe,
  ToFormGroupPipe,
]

@NgModule({
  imports: [...imports],
  declarations: [...declarations, ...providers],
  exports: [...imports, ...declarations, ...providers],
  providers: [...providers],
})
export class SharedModule {}
