import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
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

  constructor(public auth: AuthGuard, private router: Router) {}

  async loginSubmit() {
    if (!this.formGroup.valid) return

    this.auth.login(this.formGroup.getRawValue()).then(() => {
      if (this.auth.authenticatedUser.admin) this.router.navigate(['/admin'])
      else this.router.navigate(['/'])
    })
  }
}
