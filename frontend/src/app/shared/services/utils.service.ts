import { Injectable } from '@angular/core'
import {
  AbstractControl,
  FormArray,
  FormControl,
  ValidationErrors,
} from '@angular/forms'

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  timeCorrector = (control: FormControl) => {
    if (/^[0-2][0-9]$/.test(control.value)) {
      control.setValue(`${control.value}:00`)
      console.log(`${control.value}:00`)
    } else if (/^[0-2][0-9][0-9][0-9]$/.test(control.value)) {
      let string: string = control.value.toString()
      control.setValue(`${string.substring(0, 2)}:${string.substring(2, 4)}`)
      console.log(`${string.substring(0, 2)}:${string.substring(2, 4)}`)
    }
  }

  timeValidator = (c: FormControl): ValidationErrors => {
    if (/^[0-2][0-9]\:[0-9][0-9]$/.test(c.value)) {
      return null
    } else {
      let errors: ValidationErrors = {}
      errors['time'] = c.value
      return errors
    }
  }

  arrayValidator = (c: AbstractControl) => {
    return (c as FormArray).value?.length === 0
      ? { emptyArray: (c as FormArray).value?.length }
      : null
  }

  futureDateValidator = (c: AbstractControl) => {
    let value = new Date((c as FormControl).value)
    let today = new Date()
    today.setHours(0, 0, 0, 0)
    if (value.getTime() < today.getTime()) {
      let errors: ValidationErrors = {}
      errors['notInFuture'] = c.value
      return errors
    } else return null
  }
}
