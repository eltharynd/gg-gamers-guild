import {
  GoogleInitOptions,
  GoogleLoginProvider,
  GoogleSigninButtonModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login'
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
import { UsernameDialogComponent } from './components/username-dialog/username-dialog.component'
import { ToFormArrayPipe } from './pipes/formarray.pipe'
import { FormControlErrorsPipe } from './pipes/formcontrol-error.pipe'
import { ToFormGroupPipe } from './pipes/formgroup.pipe'
import { HumanIndexPipe } from './pipes/human-index.pipe'
import { TablePartiesPipe, TablePlayersPipe } from './pipes/table.pipe'
import { MaterialModule } from './ui/material.module'

const imports: any[] = [
  CommonModule,
  FontAwesomeModule,
  GoogleSigninButtonModule,
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
  UsernameDialogComponent,
]

const providers: any[] = [
  FormControlErrorsPipe,
  HumanIndexPipe,
  TablePartiesPipe,
  TablePlayersPipe,
  ToFormArrayPipe,
  ToFormGroupPipe,
]

const googleLoginOption: GoogleInitOptions = {
  oneTapEnabled: false,
}

@NgModule({
  imports: [...imports],
  declarations: [...declarations, ...providers],
  exports: [...imports, ...declarations, ...providers],
  providers: [
    ...providers,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '679568686836-2k5ic2vlgg2rcpjk3lufakcgbbv0i6ff.apps.googleusercontent.com',
              googleLoginOption
            ),
          },
        ],
        onError: (err) => {
          console.error(err)
        },
      } as SocialAuthServiceConfig,
    },
  ],
})
export class SharedModule {}
