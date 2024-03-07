import express from 'express'
import fs from 'fs'
import { Server, createServer } from 'http'
import path from 'path'
import { createExpressServer } from 'routing-controllers'
import environment from '../environment'
import { MongoInterceptor } from '../mongo'
import Logger from '../util/logger'
import { AuthController } from './auth/auth.controller'
import { EventsController } from './events/events.controller'
import { DefaultInterceptor } from './interceptors/default.interceptor'
import { HttpErrorHandler } from './middlewares/error.middleware'
import { LoggerMiddleware } from './middlewares/logger.middleware'
import { UploadsController } from './uploads/uploads.controller'
import { UsersController } from './users/users.controller'

export const origins = environment.PRODUCTION
  ? [`https://${environment.DOMAIN}`]
  : ['http://localhost:4200', `https://${environment.DOMAIN}`]

export const app: express.Express = createExpressServer({
  cors: {
    origin: origins,
    optionsSuccessStatus: 200,
    credentials: true,
  },
  routePrefix: environment.API_BASE.replace(/\/$/, ''),
  defaultErrorHandler: false,
  middlewares: [LoggerMiddleware, HttpErrorHandler],
  controllers: [
    AuthController,
    EventsController,
    UploadsController,
    UsersController,
  ],
  interceptors: [DefaultInterceptor, MongoInterceptor],
  validation: { whitelist: true },
  classToPlainTransformOptions: {
    enableCircularCheck: true,
  },
})

app.set('trust proxy', true)

/* app.use(
  `${environment.API_BASE}docs`,
  swaggerUIExpress.serve,
  swaggerUIExpress.setup(SWAGGER_SPECS, {
    customCss:
      fs
        .readFileSync(path.join(process.cwd(), 'docs/theme-flattop.css'))
        .toString() +
      fs.readFileSync(path.join(process.cwd(), 'docs/custom.css')).toString(),
  })
) */

app.use('*', (req, res, next) => {
  if (/^\/api/g.test(req.originalUrl)) return next()

  let base = path.join(process.cwd(), `static${path.sep}browser`)
  let proxied = path.join(base, req.originalUrl.replace(/\//i, path.sep))
  if (!/\/$/i.test(req.originalUrl) && fs.existsSync(proxied)) {
    return res.sendFile(proxied)
  } else return res.sendFile(path.join(base, `${path.sep}index.html`))
})

export const server: Server = createServer(app)
export const start = async (portOverride?: number): Promise<Server> => {
  return new Promise<Server>((resolve, reject) => {
    server.listen(portOverride || environment.PORT)
    server.on('error', (error) => {
      Logger.error(error)
      reject(error)
    })
    server.on('listening', () => resolve(server))
  })
}
