import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {
  Adventurer,
  AssignedEvent,
  AssignedRound,
} from 'gg-gamers-guild-interfaces'
import { environment } from '../../../../environments/environment'
import { AuthGuard } from '../../../shared/guards/auth.guard'
import { DataService } from '../../../shared/services/data.service'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent implements OnInit {
  event: AssignedEvent

  pictureURL = `${environment.API_BASE_URL}uploads/`

  constructor(
    private data: DataService,
    public auth: AuthGuard,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) {}

  id = 0
  async ngOnInit() {
    let event: AssignedEvent = await this.data.get(
      `events/${this.activatedRoute.snapshot.paramMap.get('eventId')}`
    )
    if (!event) return

    for (let r of event.rounds) for (let t of r.tables) t.parties = []

    //MOCK DATA///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    for (let r of event.rounds) {
      let parties = []
      let p = parseInt((Math.random() * 3).toFixed(0)) + 1
      for (let i = 0; i < p; i++) {
        let partners: Adventurer[] = []
        let a = parseInt((Math.random() * 2).toFixed(0))
        for (let i = 0; i < a; i++)
          partners.push({ name: `Follower${this.id++}` })
        parties.push({
          leader: { name: `Leader${this.id++}` },
          partners,
          registered: new Date(),
        })
      }
      r.parties = parties
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    for (let round of event.rounds) this.sortParties(round)

    this.event = event
  }

  //TODO remove after testing
  add(round: AssignedRound) {
    let partners: Adventurer[] = []
    let a = parseInt((Math.random() * 2).toFixed(0))
    for (let i = 0; i < a; i++) partners.push({ name: `Follower${this.id++}` })
    round.parties.push({
      leader: { name: `Leader${this.id++}` },
      partners,
      registered: new Date(),
    })
    this.sortParties(round)
    let event = this.event
    this.event = null
    this.cdr.detectChanges()

    this.event = event
  }

  sortParties(round: AssignedRound) {
    let tables = round.tables
    let available = [...round.parties].sort((a, b) => {
      return b.partners.length - a.partners.length === 0
        ? new Date(a.registered).getTime() - new Date(b.registered).getTime()
        : b.partners.length - a.partners.length
    })
    tables.forEach((t) => (t.parties = []))

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
    //tables[0].parties.push
    /*     while(available.length>0) {

    } */
  }
}
