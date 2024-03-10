import { Component, OnInit } from '@angular/core'
import {
  Adventurer,
  AssignedEvent,
  AssignedRound,
} from 'gg-gamers-guild-interfaces'
import { DataService } from '../../shared/services/data.service'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent implements OnInit {
  events: AssignedEvent[]

  constructor(private data: DataService) {}

  async ngOnInit() {
    let events: AssignedEvent[] = await this.data.get(`events`)
    for (let e of events)
      for (let r of e.rounds) for (let t of r.tables) t.parties = []

    //MOCK DATA///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let id = 0
    for (let e of events) {
      for (let r of e.rounds) {
        let parties = []
        let p = parseInt((Math.random() * 5).toFixed(0)) + 1
        for (let i = 0; i < p; i++) {
          let partners: Adventurer[] = []
          let a = parseInt((Math.random() * 8).toFixed(0))
          for (let i = 0; i < a; i++) partners.push({ name: `Follower${id++}` })
          parties.push({
            leader: { name: `Leader${id++}` },
            partners,
            registered: new Date(),
          })
        }
        r.parties = parties
      }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    for (let event of events)
      for (let round of event.rounds) this.sortParties(round)

    this.events = events
    console.log(this.events)
  }

  sortParties(round: AssignedRound) {
    let tables = round.tables
    let available = [...round.parties].sort((a, b) => {
      return b.partners.length - a.partners.length === 0
        ? new Date(a.registered).getTime() - new Date(b.registered).getTime()
        : b.partners.length - a.partners.length
    })

    console.log(available)
    while (available.length) {
      let picked = available.splice(0, 1)
      let sortedTables = tables.sort((a, b) => {
        return (
          b.parties
            .map((p) => {
              return p.partners.length + 1
            })
            .reduce((p, c) => p + c, 0) -
          a.parties
            .map((p) => {
              return p.partners.length + 1
            })
            .reduce((p, c) => p + c, 0)
        )
      })
      console.log('sorted', sortedTables)

      let newPlayers = picked
        .map((p) => p.partners.length + 1)
        .reduce((p, c) => p + c, 0)
      for (let table of sortedTables) {
        let currentPlayers = table.parties
          .map((p) => p.partners.length + 1)
          .reduce((p, c) => p + c, 0)
        let wouldBecome = currentPlayers + newPlayers
        if (
          currentPlayers < table.minimumSeats ||
          wouldBecome < table.minimumSeats
        ) {
          table.parties = table.parties.concat(picked)
          break
        } else if (sortedTables.indexOf(table) === sortedTables.length - 1) {
          table.parties = table.parties.concat(picked)
        }
      }
    }
    console.log('assigned')
    //tables[0].parties.push
    /*     while(available.length>0) {

    } */
  }
}
