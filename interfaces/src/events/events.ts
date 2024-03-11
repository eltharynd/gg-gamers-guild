import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
  ValidateNested,
} from 'class-validator'
import mongoose from 'mongoose'
import 'reflect-metadata'

export class Adventurer {
  @IsString()
  @IsNotEmpty()
  name: string
}

export class Party {
  _id?: mongoose.Types.ObjectId | string

  @ValidateNested()
  //@Type(() => Adventurer)
  leader: Adventurer
  @ValidateNested()
  @IsArray()
  // @Type(() => Adventurer)
  partners: Adventurer[]

  registered: Date
}

export class Table {
  _id?: mongoose.Types.ObjectId | string

  @IsOptional()
  @IsNumber()
  @Min(0)
  minimumSeats?: number
  @IsOptional()
  @IsNumber()
  @Min(0)
  optimalSeats?: number
  @IsNumber()
  @Min(1)
  maximumSeats: number

  @IsOptional()
  @IsBoolean()
  hasDM?: boolean
}

export class Round {
  _id?: mongoose.Types.ObjectId | string

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-2][0-9]:[0-9][0-9]$/)
  start: string
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-2][0-9]:[0-9][0-9]$/)
  end: string

  @ValidateNested()
  //@Type(() => Table)
  tables: Table[]
  @IsOptional()
  @ValidateNested()
  //@Type(() => Party)
  parties: Party[]
}

export class Event {
  _id?: mongoose.Types.ObjectId | string
  picture?: mongoose.Types.ObjectId | string

  title: string
  description: string

  location: string
  address: string
  date: Date

  rounds: Round[]
}

export class AssignedTable extends Table {
  parties: Party[] = []
}
export class AssignedRound extends Round {
  override tables: AssignedTable[]
}
export class AssignedEvent extends Event {
  override rounds: AssignedRound[]
}

export class AssignedAdventurerWithCoordinates extends Adventurer {
  index: number
  coordinates: { x: number; y: number }
}
