import { Pipe, PipeTransform } from '@angular/core'
import { AbstractControl, FormGroup } from '@angular/forms'

@Pipe({
  name: 'toFormGroup',
})
export class ToFormGroupPipe implements PipeTransform {
  transform(formControl: AbstractControl) {
    return formControl as FormGroup
  }
}
