import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'humanIndex',
})
export class HumanIndexPipe implements PipeTransform {
  transform(index: number) {
    return [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ][index % 26]
  }
}
