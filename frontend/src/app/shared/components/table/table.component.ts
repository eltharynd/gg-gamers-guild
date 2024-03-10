import { Component, Input, OnInit } from '@angular/core'
import {
  AssignedAdventurerWithCoordinates,
  AssignedTable,
} from 'gg-gamers-guild-interfaces'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input('table') table: AssignedTable
  @Input('WIDTH') width: number = 14

  constructor() {}

  TABLE_WIDTH: number = this.width
  TABLE_HEIGHT: number = this.TABLE_WIDTH * 0.8
  ngOnInit() {
    //TODO remove (testing)
    this.table.hasDM = true

    let index = 0
    //Clock-Wise ordering
    let startAngle = (Math.PI * 2) / 3
    let stopAngle = (-Math.PI * 2) / 3
    if (!this.table.hasDM) {
      startAngle = Math.PI
      stopAngle = -Math.PI
      this.TABLE_HEIGHT = this.TABLE_WIDTH
    }
    let stepAngle =
      Math.abs(stopAngle - startAngle) /
      (this.table.parties
        .map((p) => p.partners.length + 1)
        .reduce((p, c) => p + c, 0) -
        1)

    let perimeterSection

    //angle of rectangle bisect
    let ε = Math.atan(this.TABLE_HEIGHT / this.TABLE_WIDTH)
    //radius of the circle encompassing the table rectangle
    let r = this.TABLE_HEIGHT / 2 / Math.sin(ε)

    let players: AssignedAdventurerWithCoordinates[] = this.table.parties
      .map((p) => {
        return [p.leader, ...p.partners] as AssignedAdventurerWithCoordinates[]
      })
      .reduce((p, c) => {
        return [...p, ...c]
      }, [])

    for (let player of players) {
      player.index = index++

      //angle of the ray
      let θ = startAngle - stepAngle * player.index

      //ray on sphere coordinates
      let x = Math.cos(θ) * r
      let y = Math.sin(θ) * r

      player.coordinates = this.coordinatesOfInscribedRectangle(
        this.TABLE_WIDTH,
        this.TABLE_HEIGHT,
        { x, y }
      )
    }
  }

  computeCoordinates(coordinates: { x: number; y: number }) {
    //console.log(`translateX(${coordinates.x}%) translateY(${-coordinates.y}%)`)
    return {
      transform: `translateX(${
        coordinates.x
      }rem) translateY(${-coordinates.y}rem)`,
    }
  }

  coordinatesOfInscribedRectangle(
    width: number,
    height: number,
    coordinates: { x: number; y: number }
  ): { x: number; y: number } {
    let x = coordinates.x,
      y = coordinates.y
    let θ = Math.atan(y / x)

    if (Math.abs(x) <= width / 2 && Math.abs(y) <= height / 2) {
      //ray is inside of rectangle (intersecting points)
      //do nothing
    } else if (Math.abs(x) <= width / 2 && Math.abs(y) >= height / 2) {
      //ray is above/under rectangle
      y = (this.TABLE_HEIGHT / 2) * (y > 0 ? 1 : -1)
      x = (1 / Math.tan(θ)) * y
    } else if (Math.abs(x) >= width / 2 && Math.abs(y) <= height / 2) {
      //ray is left/right of rectangle
      x = (width / 2) * (x > 0 ? 1 : -1)
      y = Math.tan(θ) * x
    }
    return { x, y }
  }
}
