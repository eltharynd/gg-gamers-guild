import { Pipe, PipeTransform } from '@angular/core'
import { AbstractControl, FormControl } from '@angular/forms'

@Pipe({
  name: 'formControlError',
  pure: false,
})
export class FormControlErrorsPipe implements PipeTransform {
  transform(formControl: FormControl | AbstractControl) {
    if (formControl.status === 'VALID') return null

    if (formControl.errors['required']) {
      return 'Obbligatorio'
    } else if (formControl.errors['email']) {
      return "Non è un'email valida"
    } else if (formControl.errors['maxlength']) {
      return `Troppo lungo ${formControl.errors['maxlength'].actualLength}/${formControl.errors['maxlength'].requiredLength}`
    } else if (formControl.errors['minlength']) {
      return `Troppo corto ${formControl.errors['minlength'].actualLength}/${formControl.errors['minlength'].requiredLength}`
    } else if (formControl.errors['pattern']) {
      return `Pattern incorretto`
    } else if (formControl.errors['notAdult']) {
      return `Devi essere maggiorenne`
    } else if (formControl.errors['time']) {
      return `Devi inserire un orario valido (es: '12:15')`
    } else if (formControl.errors['emptyArray']) {
      return `Devi ancora inserire dei campi`
    } else if (formControl.errors['notInFuture']) {
      return `La data deve essere nel futuro`
    } else {
      return 'Campo non valido'
    }
  }
}
