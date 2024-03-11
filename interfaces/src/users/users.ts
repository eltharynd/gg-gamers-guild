import mongoose from 'mongoose'

export enum DisplayThemes {
  'system' = 'system',
  'dark' = 'dark',
  'light' = 'light',
}

export enum DisplayLanguages {
  'en' = 'en',
  'it' = 'it',
}

export class Settings {
  selectedTheme: DisplayThemes
  selectedLanguage: DisplayLanguages
}

export class GoogleUser {
  id: string
  idToken: string
  email: string
  firstName: string
  lastName: string
  photoUrl: string
}

export class PublicUser {
  email: string

  username?: string

  firstName?: string
  lastName?: string

  google?: GoogleUser

  admin?: boolean

  settings?: Settings
}

export class User extends PublicUser {
  _id?: mongoose.Types.ObjectId | string

  password: string
}
