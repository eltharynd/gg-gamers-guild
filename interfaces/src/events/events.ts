import mongoose from 'mongoose'

export class Adventurer {
  name: string
}

export class Party {
  leader: Adventurer
  partners: Adventurer[]
}

export class Table {
  minimumSeats?: number
  optimalSeats?: number
  maximumSeats: number
}

export class Event {
  _id?: mongoose.Types.ObjectId | string

  title: string
  description: string

  date: Date

  tables: Table[]
  parties: Party[]
}
