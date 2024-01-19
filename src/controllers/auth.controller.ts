import { NextFunction, Request, RequestHandler, Response } from 'express'
import { validationResult } from 'express-validator'

import { ApiError } from '../exceptions/api.error'
import { AuthService } from '../services/auth/auth.service'
import { REFRESH_TOKEN } from '../constants/token.constants'
import { TEditBody, TLoginBody, TRegistrationBody } from '../types/auth.types'
import { AUTH_ERROR } from '../constants/errors.constant'
import { TUser } from '../types/user.types'
import { TActivationId } from '../types/id.types'
import { TRefreshToken } from '../types/token.types'

class AuthController_class {
  public activate: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activationId } = req.params as TActivationId

      await AuthService.activate(activationId)

      return res.redirect(process.env.CLIENT_URL)
    } catch (error) {
      next(error)
    }
  }

  public edit: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: profileId } = req.body.user as TUser
      const body = req.body as TEditBody

      await AuthService.edit(+profileId, body)

      res.send({ success: true })
    } catch (error) {
      next(error)
    }
  }

  public login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as TLoginBody

      const user = await AuthService.login(email, password)

      this.setRefreshToken(res, user.refreshToken)

      res.send(user)
    } catch (error) {
      next(error)
    }
  }

  public logout: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies as TRefreshToken

      await AuthService.logout(refreshToken)

      res.clearCookie(REFRESH_TOKEN)

      return res.json({ success: true })
    } catch (error) {
      next(error)
    }
  }

  public refresh: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies as TRefreshToken

      const user = await AuthService.refresh(refreshToken)

      this.setRefreshToken(res, user.refreshToken)

      res.send(user)
    } catch (error) {
      next(error)
    }
  }

  public registration: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty())
        return next(ApiError.BadRequest(AUTH_ERROR.validationError, errors.array()))

      const { email, name, password } = req.body as TRegistrationBody

      const user = await AuthService.registration(email, password, name)

      this.setRefreshToken(res, user.refreshToken)

      res.send(user)
    } catch (error) {
      next(error)
    }
  }

  public remove: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies as TRefreshToken

      await AuthService.remove(refreshToken)

      res.clearCookie(REFRESH_TOKEN)

      res.send({ success: true })
    } catch (error) {
      next(error)
    }
  }

  private setRefreshToken(res: Response, refreshToken: string) {
    res.cookie(REFRESH_TOKEN, refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: 'none',
      secure: true
    })
  }
}

export const AuthController = new AuthController_class()
