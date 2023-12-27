import { NextFunction, Request, RequestHandler, Response } from 'express'

import { UserService } from '../services/user/user.service'

class UserController_class {
  public getAll: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserService.getAll()
      res.send(users)
    } catch (error) {
      next(error)
    }
  }

  public getOne: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const user = await UserService.getOne(Number(id))
      res.send(user)
    } catch (error) {
      next(error)
    }
  }
}

export const UserController = new UserController_class()
