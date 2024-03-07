import { Transform, Type } from 'class-transformer'
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator'
import 'reflect-metadata'

export class Test {
  @IsString()
  @Matches(/^[4][0-9]:[0-9][0-9]$/)
  start: string
  @IsString()
  end: string
}

export class CreateEventRequest {
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

  @IsArray()
  @Type((t) => Test)
  @Transform(({ value }) => JSON.parse(value))
  @ValidateNested()
  rounds: Test[]
}
