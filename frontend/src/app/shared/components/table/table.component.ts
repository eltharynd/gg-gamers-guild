import { Component, Input, OnChanges } from '@angular/core'
import {
  AssignedAdventurerWithCoordinates,
  AssignedTable,
} from 'gg-gamers-guild-interfaces'

class Seat {
  index: number
  coordinates: { x: number; y: number }
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  @Input('table') table: AssignedTable
  @Input('WIDTH') width: number = 14

  seats: Partial<Seat>[] = []
  extraSeats: Partial<Seat>[] = []

  partiesColors: { bg: string; border: string }[] = [
    { bg: '#64b5f6', border: '#2196f3' }, //blue
    { bg: '#81c784', border: '#4caf50' }, //green
    { bg: '#ffb74d', border: '#ff9800' }, //orange

    { bg: '#ba68c8', border: '#9c27b0' }, //purple
    { bg: '#4db6ac', border: '#009688' }, //teal

    { bg: '#f06292', border: '#e91e63' }, //pink
    { bg: '#ffd54f', border: '#ffc107' }, //amber

    { bg: '#7986cb', border: '#3f51b5' }, //indigo
    { bg: '#aed581', border: '#8bc34a' }, //light green

    { bg: '#fff176', border: '#ffeb3b' }, //yellow
    { bg: '#ff8a65', border: '#ff5722' }, //deep orange
    { bg: '#dce775', border: '#cddc39' }, //lime
    { bg: '#9575cd', border: '#673ab7' }, //deep purple
    { bg: '#4fc3f7', border: '#03a9f4' }, //light blue
    { bg: '#4dd0e1', border: '#00bcd4' }, //cyan
  ]

  tableColor: { bg: string; border: string } = {
    bg: '#a1887f',
    border: '#795548',
  } //brown

  dmColor: { bg: string; border: string } = { bg: '#e57373', border: '#f44336' } //red

  seatColor: { bg: string; border: string } = {
    bg: '#90a4ae',
    border: '#607d8b',
  } //blue grey
  extraSeatColor: { bg: string; border: string } = {
    bg: '#e0e0e0',
    border: '#9e9e9e',
  } //grey

  constructor() {}

  TABLE_WIDTH: number = this.width
  TABLE_HEIGHT: number = this.TABLE_WIDTH

  ngOnChanges() {
    //TODO remove (testing)
    this.table.hasDM = true
    this.seats = []
    this.extraSeats = []

    let players: (AssignedAdventurerWithCoordinates | Partial<Seat>)[] =
      this.table.parties
        .map((p) => {
          return [
            p.leader,
            ...p.partners,
          ] as AssignedAdventurerWithCoordinates[]
        })
        .reduce((p, c) => {
          return [...p, ...c]
        }, [])

    while (
      players.length < (this.table.optimalSeats || this.table.maximumSeats)
    ) {
      let seat: Partial<Seat> = {}
      this.seats.push(seat)
      players.push(seat)
    }
    while (players.length < this.table.maximumSeats) {
      let extraSeat: Partial<Seat> = {}
      this.extraSeats.push(extraSeat)
      players.push(extraSeat)
    }

    let index = 0
    //Clock-Wise ordering
    let startAngle = Math.PI //(Math.PI * 2) / 3
    let stopAngle = -Math.PI //(-Math.PI * 2) / 3
    /*     if (!this.table.hasDM) {
      startAngle = Math.PI
      stopAngle = -Math.PI
      this.TABLE_HEIGHT = this.TABLE_WIDTH
    } */

    let stepAngle =
      Math.abs(stopAngle - startAngle) /
      (players.length + (this.table.hasDM ? 3 : 0))

    //angle of rectangle bisect
    let ε = Math.atan(this.TABLE_HEIGHT / this.TABLE_WIDTH)
    //radius of the circle encompassing the table rectangle
    let r = this.TABLE_HEIGHT / 2 + 1 /// Math.sin(ε)

    for (let player of players) {
      player.index = index++

      //angle of the ray
      let θ =
        startAngle - stepAngle * (player.index + (this.table.hasDM ? 2 : 0))

      //ray on sphere coordinates
      let x = Math.cos(θ) * r
      let y = Math.sin(θ) * r

      player.coordinates = { x, y }
    }
  }

  playerColors(partyIndex: number) {
    return this.partiesColors[partyIndex % this.partiesColors.length]
  }

  computeCoordinates(coordinates: { x: number; y: number }) {
    return {
      transform: `translateX(${
        coordinates?.x
      }rem) translateY(${-coordinates?.y}rem)`,
    }
  }
}
