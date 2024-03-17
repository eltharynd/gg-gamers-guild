import { Request } from 'express'
import {
  Body,
  JsonController,
  Param,
  Post,
  Req,
  UseBefore,
} from 'routing-controllers'
import { AuthGuard } from '../middlewares/auth.middleware'
import { Users } from '../users/users.model'

@JsonController(`/bookings`)
export class BookingsController {
  @Post(`/:eventId/rounds/:roundId/available`)
  @UseBefore(AuthGuard)
  async post(
    @Param('eventId') eventId: string,
    @Param('roundId') roundId: string,
    @Body() body,
    @Req() req: Request
  ) {
    return (
      await Users.find({
        $and: [
          {
            $or: [
              { username: { $regex: body.search, $options: 'i' } },
              { email: { $regex: body.search, $options: 'i' } },
            ],
          },
          { _id: { $ne: req.auth._id } },
        ],
      })
    ).map((u) => {
      return { user: u.id, name: u.username, participates: false }
    })
  }
}
