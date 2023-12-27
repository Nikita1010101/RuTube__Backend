import { NextFunction, Request, RequestHandler, Response } from 'express'
import { validationResult } from 'express-validator'

import { ApiError } from '../exceptions/api.error'
import { AuthService } from '../services/auth/auth.service'
import { IUser } from '../types/user.types'
import { REFRESH_TOKEN } from '../constants/token.constants'
import { IBodyLogin, IBodyRegistration } from '../types/auth.types'
import { AUTH_ERROR } from '../constants/errors.constant'

class AuthController_class {
  public activate: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { link } = req.params as { link: string }
      await AuthService.activate(link)
      return res.redirect(process.env.CLIENT_URL)
    } catch (error) {
      next(error)
    }
  }

  public registration: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest(AUTH_ERROR.validationError, errors.array()))
      }

      const { name, email, password } = req.body as IBodyRegistration

      const user = await AuthService.registration(email, password, name)

      res.cookie(REFRESH_TOKEN, user.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      })

      res.send(user)
    } catch (error) {
      next(error)
    }
  }

  public login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as IBodyLogin
      const user = await AuthService.login(email, password)

      res.cookie(REFRESH_TOKEN, user.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      })

      res.send(user)
    } catch (error) {
      next(error)
    }
  }

  public logout: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies as { refreshToken: string }
      const token = await AuthService.logout(refreshToken)
      res.clearCookie(REFRESH_TOKEN)
      return res.json(token)
    } catch (error) {
      next(error)
    }
  }

  public refresh: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies as { refreshToken: string }
      const user = await AuthService.refresh(refreshToken)

      res.cookie(REFRESH_TOKEN, user.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      })

      res.send(user)
    } catch (error) {
      next(error)
    }
  }

  public edit: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as IUser
      await AuthService.edit(body)
      res.send({})
    } catch (error) {
      next(error)
    }
  }
}

export const AuthController = new AuthController_class()
