import { Pipe, PipeTransform } from '@angular/core'
import { AbstractControl, FormControl } from '@angular/forms'

@Pipe({
  name: 'forrmControlError',
  pure: false,
})
export class FormControlErrorsPipe implements PipeTransform {
  transform(formControl: FormControl | AbstractControl) {
    if (formControl.status === 'VALID') return null

    if (formControl.errors['required']) {
      return 'Required'
    } else if (formControl.errors['email']) {
      return 'Not a valid email'
    } else if (formControl.errors['maxlength']) {
      return `Too long ${formControl.errors['maxlength'].actualLength}/${formControl.errors['maxlength'].requiredLength}`
    } else if (formControl.errors['minlength']) {
      return `Too short ${formControl.errors['minlength'].actualLength}/${formControl.errors['minlength'].requiredLength}`
    } else if (formControl.errors['pattern']) {
      return `Invalid pattern`
    } else if (formControl.errors['notAdult']) {
      return `You have to be over 18 years old`
    } else {
      return 'Invalid field'
    }
  }
}
