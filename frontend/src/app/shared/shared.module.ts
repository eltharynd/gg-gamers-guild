import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FooterComponent } from './components/footer/footer.component'
import { HeaderComponent } from './components/header/header.component'
import { LayoutComponent } from './components/layout/layout.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { TableComponent } from './components/table/table.component'
import { ToFormArrayPipe } from './pipes/formarray.pipe'
import { FormControlErrorsPipe } from './pipes/formcontrol-error.pipe'
import { ToFormGroupPipe } from './pipes/formgroup.pipe'
import { TablePartiesPipe, TablePlayersPipe } from './pipes/table.pipe'
import { MaterialModule } from './ui/material.module'

const imports: any[] = [
  CommonModule,
  FontAwesomeModule,
  HttpClientModule,
  MaterialModule,
  RouterModule,
]

const declarations: any[] = [
  FooterComponent,
  HeaderComponent,
  LayoutComponent,
  NotFoundComponent,
  TableComponent,
]

const providers: any[] = [
  FormControlErrorsPipe,
  TablePartiesPipe,
  TablePlayersPipe,
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
