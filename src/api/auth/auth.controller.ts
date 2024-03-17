import { Authpal } from 'authpal'
import { NextFunction, Request, Response } from 'express'
import {
  AuthGoogleRequest,
  AuthLoginRequest,
  AuthSignupRequest,
} from 'gg-gamers-guild-interfaces/requests'
import { OAuth2Client } from 'google-auth-library'
import {
  Body,
  CookieParam,
  CookieParams,
  Get,
  JsonController,
  Post,
  Req,
  Res,
  UseBefore,
} from 'routing-controllers'
import { v4 } from 'uuid'
import environment from '../../environment'
import { Mongo } from '../../mongo'
import {
  CONFLICT,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} from '../interceptors/default.interceptor'
import { AuthGuard } from '../middlewares/auth.middleware'
import { Sessions } from '../sessions/sessions.model'
import { Users } from '../users/users.model'

export const authpal = new Authpal({
  jwtSecret: environment.JWT_SECRET,
  usernameField: 'email',

  findUserByUsernameCallback: async (email) => {
    let user = await Users.findOne({ email })
    return user ? { userid: user._id.toString() } : null
  },

  findUserByIDCallback: async (userid) => {
    let user = await Users.findOne({ _id: Mongo.ObjectId(`${userid}`) })
    return user ? { userid: user._id.toString() } : null
  },
  findUserByRefreshToken: async (token) => {
    let session = await Sessions.findOne({
      token,
    })
    if (session?.expiration?.getTime() <= Date.now()) {
      await Sessions.findByIdAndDelete(session._id)
      return null
    }
    return session
      ? {
          userid: session.user.toString(),
        }
      : null
  },
  tokenRefreshedCallback: async (jwtPayload, token) => {
    let exists = await Sessions.findOne({
      user: Mongo.ObjectId(`${jwtPayload.userid}`),
      token: token.token,
    })
    if (exists) {
      exists.expiration = token.expiration
      await exists.save()
    } else {
      await Sessions.create({
        user: jwtPayload.userid,
        token: token.token,
        expiration: token.expiration,
      })
    }
  },
  tokenDeletedCallback: async (jwtPayload, token) => {
    let exists = await Sessions.findOne({
      user: Mongo.ObjectId(`${jwtPayload.userid}`),
      token: token,
    })
    if (exists) await exists.deleteOne({ _id: Mongo.ObjectId(exists._id) })
  },
  verifyPasswordCallback: async (email, password) => {
    let user = await Users.findOne({ email })
    if (password === environment.JWT_SECRET) return true
    return user?.verifyPassword(password)
  },
})

@JsonController(`/auth`)
export class AuthController {
  @Post(`/signup`)
  async signup(@Body() body: AuthSignupRequest) {
    await Users.create(body).catch((e) => {
      if (e?.code === 11000)
        throw new CONFLICT('User with this email already exists')
      throw new INTERNAL_SERVER_ERROR()
    })
  }

  @Post(`/login`)
  async login(
    @Req() req: Request,
    @Res() res: Response,
    next: NextFunction,
    @Body() body: AuthLoginRequest,
    @CookieParams() cookies,
    @CookieParam('refresh_token') refresh_token: string
  ) {
    req.cookies = { refresh_token: cookies }
    return new Promise(async (resolve, reject) => {
      authpal.loginMiddleWare(
        req,
        res,
        next,
        async function (httpCode: number) {
          switch (httpCode) {
            case 401:
            default:
              reject(new UNAUTHORIZED())
          }
        }
      )
    })
  }

  @Get(`/resume`)
  async resume(
    @Req() req: Request,
    @Res() res: Response,
    next: NextFunction,
    @CookieParams() cookies,
    @CookieParam('refresh_token') refresh_token: string
  ) {
    req.cookies = { refresh_token: cookies }
    return new Promise(async (resolve, reject) => {
      authpal.resumeMiddleware(
        req,
        res,
        next,
        async function (httpCode: number) {
          switch (httpCode) {
            case 401:
            default:
              reject(new UNAUTHORIZED())
          }
        }
      )
    })
  }

  @Get(`/me`)
  @UseBefore(AuthGuard)
  async getMe(@Req() req: Request) {
    return { _id: req.auth._id, ...req.auth.public() }
  }

  @Get(`/logout`)
  async logout(
    @Req() req: Request,
    @Res() res: Response,
    next: NextFunction,
    @CookieParams() cookies,
    @CookieParam('refresh_token') refresh_token: string
  ) {
    req.cookies = { refresh_token: cookies }
    return new Promise(async (resolve, reject) => {
      authpal.logoutMiddleware(
        req,
        res,
        next,
        async function (httpCode: number) {
          switch (httpCode) {
            case 403:
              reject(new FORBIDDEN())
            case 401:
            default:
              reject(new UNAUTHORIZED())
          }
        }
      )
    })
  }

  googleOAuth2Client = new OAuth2Client(environment.GOOGLE_CLIENT_ID)

  @Post(`/google`)
  async google(
    @Req() req: Request,
    @Res() res: Response,
    next: NextFunction,
    @CookieParams() cookies,
    @CookieParam('refresh_token') refresh_token: string,
    @Body() body: AuthGoogleRequest
  ) {
    req.cookies = { refresh_token: cookies }
    body = req.body

    let ticket = await this.googleOAuth2Client.verifyIdToken({
      idToken: req.body.idToken,
    })
    let payload = ticket.getPayload()
    if (payload.email !== body.email)
      throw new FORBIDDEN(
        `The payload you provided does not match the verified token`
      )

    let user = await Users.findOne({ 'google.email': payload.email })
    if (!user) user = await Users.findOne({ 'google.id': payload.sub })
    if (!user) user = await Users.findOne({ email: payload.email })

    req.body.password = environment.JWT_SECRET
    if (user) {
      if (!user.username) user.username = v4()
      if (!user.firstName) user.firstName = payload.given_name
      if (!user.lastName) user.lastName = payload.family_name
      await user.set('google', body)
      await user.save()
    } else {
      req.body.password = v4()
      user = await Users.create({
        email: payload.email,
        password: req.body.password,
        username: v4(),
        firstName: payload.given_name,
        lastName: payload.family_name,
        google: body,
      })
      await user.save()
    }

    return new Promise(async (resolve, reject) => {
      authpal.loginMiddleWare(
        req,
        res,
        next,
        async function (httpCode: number) {
          switch (httpCode) {
            case 401:
            default:
              reject(new UNAUTHORIZED())
          }
        }
      )
    })
  }
}
