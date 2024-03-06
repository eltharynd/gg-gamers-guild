import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  UseBefore,
} from 'routing-controllers'
import { CreateEventRequest } from '../../../interfaces/dist/events/events.requests'
import { BAD_REQUEST } from '../interceptors/default.interceptor'
import { AdminGuard } from '../middlewares/auth.middleware'
import { EventModel, Events } from './events.model'

@JsonController(`/events`)
export class EventsController {
  @Get(`/`)
  async getEvents() {
    return await Events.find().sort({ date: -1 })
  }

  @Post(`/`)
  @UseBefore(AdminGuard)
  async createEvent(@Body() body: CreateEventRequest) {
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
}
