import { NextFunction, Request, RequestHandler, Response } from 'express'

import { UserService } from '../services/user/user.service'
import { TUserId } from '../types/id.types'

class UserController_class {
  public getOne: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params as TUserId

      const user = await UserService.getOne(+userId)

      res.send(user)
    } catch (error) {
      next(error)
    }
  }
}

export const UserController = new UserController_class()
