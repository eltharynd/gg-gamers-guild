import {
  Adventurer,
  Event,
  Party,
  Round,
  Table,
} from 'gg-gamers-guild-interfaces'
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

const roundSchema: Schema<Round> = new Schema(
  {
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
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
    _id: false,
  }
)
export interface RoundModel extends Round, Document {}

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

    location: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    rounds: {
      type: [roundSchema],
      required: true,
      default: [],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export interface EventModel extends Omit<Event, '_id'>, Document {}
export const Events = mongoose.model<EventModel>('events', eventSchema)
