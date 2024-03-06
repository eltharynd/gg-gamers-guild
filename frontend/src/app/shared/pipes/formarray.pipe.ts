import { Pipe, PipeTransform } from '@angular/core'
import { AbstractControl, FormArray } from '@angular/forms'

@Pipe({
  name: 'toFormArray',
})
export class ToFormArrayPipe implements PipeTransform {
  transform(formControl: AbstractControl) {
    return formControl as FormArray
  }
}
