import { Adventurer, Party, Table } from 'gg-gamers-guild-interfaces'
import mongoose, { Document, Schema } from 'mongoose'

const adventurerSchema: Schema<Adventurer> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
)
export interface AdventurerModel extends Adventurer, Document {}

const partySchema: Schema<Party> = new Schema(
  {
    leader: {
      type: adventurerSchema,
      required: true,
    },
    partners: {
      type: [adventurerSchema],
      required: true,
      default: [],
    },
  },
  {
    _id: false,
  }
)
export interface TableModel extends Party, Document {}

const tableSchema: Schema<Table> = new Schema(
  {
    minimumSeats: {
      type: Number,
    },
    optimalSeats: {
      type: Number,
    },
    maximumSeats: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
)
export interface TableModel extends Table, Document {}

const eventSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    tables: {
      type: [tableSchema],
      required: true,
      default: [],
    },
    parties: {
      type: [partySchema],
      required: true,
      default: [],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export interface EventModel extends Event, Document {}
export const Events = mongoose.model<EventModel>('events', eventSchema)
