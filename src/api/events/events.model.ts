import {
  Adventurer,
  Event,
  Party,
  Round,
  Table,
} from 'gg-gamers-guild-interfaces'
import mongoose, { Document, Schema } from 'mongoose'
import { Mongo } from '../../mongo'

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

const partySchema: Schema<Party> = new Schema({
  leader: {
    type: adventurerSchema,
    required: true,
  },
  partners: {
    type: [adventurerSchema],
    required: true,
    default: [],
  },
})
export interface PartyModel extends Omit<Party, '_id'>, Document {}

const tableSchema: Schema<Table> = new Schema({
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
  hasDM: {
    type: Boolean,
    required: true,
  },
})
export interface TableModel extends Omit<Table, '_id'>, Document {}

const roundSchema: Schema<Round> = new Schema({
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
})
export interface RoundModel extends Omit<Round, '_id'>, Document {}

const eventSchema: Schema = new Schema(
  {
    picture: {
      type: mongoose.Types.ObjectId,
      ref: 'uploads',
    },
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
const safeDelete = async function (next?) {
  let _id = this._conditions?._id
  if (!_id)
    throw new Error('Not Allowed (Enforcing deletion of users one at a time)')

  let files = await Mongo.Uploads.find({
    'metadata.event': Mongo.ObjectId(_id),
  }).toArray()

  for (let file of files) {
    await Mongo.Uploads.delete(file._id)
  }

  try {
    if (next) next()
  } catch {}
}
eventSchema.pre('findOneAndDelete', safeDelete)
eventSchema.pre('deleteMany', safeDelete)
eventSchema.pre('deleteOne', safeDelete)

export interface EventModel extends Omit<Event, '_id'>, Document {}
export const Events = mongoose.model<EventModel>('events', eventSchema)
