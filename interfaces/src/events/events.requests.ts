import { Type } from 'class-transformer'
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator'
import 'reflect-metadata'
import { Event, Round } from './events'

export class CreateEventRequest implements Event {
  @IsString()
  @IsNotEmpty()
  title: string
  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  location: string
  @IsString()
  @IsNotEmpty()
  address: string
  @IsDateString()
  @IsNotEmpty()
  date: Date

  @ValidateNested()
  @IsArray()
  @Type(() => Round)
  rounds: Round[]
}
