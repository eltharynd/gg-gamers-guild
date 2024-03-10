import { Pipe, PipeTransform } from '@angular/core'
import { AssignedTable } from 'gg-gamers-guild-interfaces'

@Pipe({
  name: 'tableParties',
})
export class TablePartiesPipe implements PipeTransform {
  transform(table: AssignedTable) {
    return table.parties.length
  }
}

@Pipe({
  name: 'tablePlayers',
})
export class TablePlayersPipe implements PipeTransform {
  transform(table: AssignedTable) {
    return table.parties
      .map((p) => p.partners.length + 1)
      .reduce((p, c) => p + c, 0)
  }
}
