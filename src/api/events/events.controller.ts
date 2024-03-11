import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Req,
  UseBefore,
} from 'routing-controllers'
import { Readable } from 'stream'
import { Mongo } from '../../mongo'
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from '../interceptors/default.interceptor'
import { AdminGuard } from '../middlewares/auth.middleware'
import { uploadsMiddleware } from '../middlewares/multer.middleware'
import { EventModel, Events } from './events.model'

@JsonController(`/events`)
export class EventsController {
  @Get(`/`)
  async getEvents() {
    return await Events.find().sort({ date: -1 })
  }

  @Post(`/`)
  @UseBefore(AdminGuard)
  //TODO fix class-validator
  async createEvent(@Body({ validate: false }) body: any) {
    console.log(body.rounds)
    return await Events.create(body)
  }

  @Delete(`/:eventId`)
  @UseBefore(AdminGuard)
  async deleteEvent(@Param('eventId') eventId: string) {
    let event: EventModel = await Events.findById(eventId)
    let date = new Date(event.date)
    date.setHours(0, 0, 0, 0)
    let today = new Date()
    today.setHours(0, 0, 0, 0)
    if (date.getTime() < today.getTime())
      throw new BAD_REQUEST(`You cannot delete past events...`)

    await event.deleteOne()
  }

  @Post(`/:eventId`)
  @UseBefore(AdminGuard)
  @UseBefore(uploadsMiddleware)
  async upload(@Req() req: any, @Param('eventId') eventId: string) {
    if (!req.file)
      throw new BAD_REQUEST(`You didn't send a file with your request...`)

    let event = await Events.findById(eventId)
    if (!event) throw new NOT_FOUND(`The specified event does not exist`)

    let files = await Mongo.Uploads.find({
      'metadata.event': Mongo.ObjectId(eventId),
    }).toArray()

    for (let file of files) {
      await Mongo.Uploads.delete(file._id)
    }

    let readStream = Readable.from(req.file.buffer)

    return new Promise<any>(async (resolve, reject) => {
      readStream.on('error', (e) => {
        reject(new INTERNAL_SERVER_ERROR(e))
      })

      let stream = Mongo.Uploads.openUploadStream(req.file.originalname, {
        chunkSizeBytes: 1048576,
        metadata: {
          event: Mongo.ObjectId(eventId),
        },
      }).on('finish', async () => {
        if (!stream.errored) {
          event.picture = Mongo.ObjectId(stream.id)
          await event.save()
          resolve({ _id: stream.id.toString() })
        }
      })

      readStream.pipe(stream)
    })
  }
}
