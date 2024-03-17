import { Pipe, PipeTransform } from '@angular/core'
import { Adventurer } from 'gg-gamers-guild-interfaces'

@Pipe({
  name: 'adventurer',
})
export class AdventurerPipe implements PipeTransform {
  transform(adventurer: Adventurer) {
    if (adventurer.name) {
      if (
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
          adventurer.name
        )
      ) {
        return '<username non scelto>'
      } else {
        if (adventurer.user) return adventurer.name
        else return `Ospite: ${adventurer.name}`
      }
    } else {
      return '<email privata>'
    }
  }
}
