import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthGuard } from '../../shared/guards/auth.guard'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.scss'],
})
export class LoginComponent {
  formGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(public auth: AuthGuard) {}

  async loginSubmit() {
    if (!this.formGroup.valid) return

    await this.auth.login(this.formGroup.getRawValue())
  }
}
