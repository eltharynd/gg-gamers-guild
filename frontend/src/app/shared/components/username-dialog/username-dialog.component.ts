import { Component, Inject } from '@angular/core'
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { AuthGuard } from '../../guards/auth.guard'
import { DataService } from '../../services/data.service'

export interface UserDialogData {
  username: string
}

@Component({
  selector: 'username-dialog',
  templateUrl: './username-dialog.component.html',
  styleUrl: './username-dialog.component.scss',
})
export class UsernameDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UsernameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: UserDialogData,
    public data: DataService,
    public auth: AuthGuard
  ) {}

  formGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      (c: FormControl) => {
        if (this.alreadyExists) {
          let errors: ValidationErrors = {}
          errors['usernameExists'] = c.value
          return errors
        } else return null
      },
    ]),
  })

  onClick() {
    this.dialogRef.close()
  }

  alreadyExists: boolean
  save() {
    if (!this.auth.authenticatedUser) return this.dialogRef.close()
    if (!this.formGroup.valid || this.data.busy) return

    this.alreadyExists = false
    let username = this.formGroup.controls.username.value

    this.data
      .patch(`users/${this.auth.authenticatedUser._id}`, {
        username,
      })
      .then((data) => {
        this.auth.me()
        this.dialogRef.close()
      })
      .catch((e) => {
        this.alreadyExists = true
      })
  }
}
