import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator'
import 'reflect-metadata'
import { GoogleUser, User } from '../users/users'

export class AuthSignupRequest implements Partial<User> {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstName: string

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastName: string
}

export class AuthLoginRequest implements Partial<User> {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class AuthGoogleRequest implements GoogleUser {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  id: string

  @IsString()
  @IsNotEmpty()
  idToken: string

  @IsString()
  @IsNotEmpty()
  firstName: string
  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  photoUrl: string

  @IsString()
  @IsNotEmpty()
  @Matches(/GOOGLE/)
  provider: 'GOOGLE'
}
