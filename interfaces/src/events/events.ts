import { Type } from 'class-transformer'
import {
  IsArray,
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
  @ValidateNested()
  @Type(() => Adventurer)
  leader: Adventurer
  @ValidateNested()
  @IsArray()
  @Type(() => Adventurer)
  partners: Adventurer[]
}

export class Table {
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
}

export class Round {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-2][0-9]:[0-9][0-9]$/)
  start: string
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-2][0-9]:[0-9][0-9]$/)
  end: string

  @ValidateNested()
  @IsArray()
  @Type(() => Table)
  tables: Table[]
  @IsOptional()
  @ValidateNested()
  @IsArray()
  @Type(() => Party)
  parties: Party[]
}

export class Event {
  _id?: mongoose.Types.ObjectId | string

  title: string
  description: string

  location: string
  address: string
  date: Date

  rounds: Round[]
}
