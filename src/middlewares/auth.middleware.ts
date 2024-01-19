import { NextFunction, Request, Response } from 'express'

import { ApiError } from '../exceptions/api.error'
import { TokenService } from '../services/token/token.service'
import { TUser } from '../types/user.types'

export const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization_header = req.headers.authorization as string

    if (!authorization_header) return next(ApiError.UnauthorizedError())

    const access_token = authorization_header.split(' ')[1] as string

    if (!access_token) return next(ApiError.UnauthorizedError())

    const user = TokenService.validateAccessToken(access_token) as TUser

    if (!user) return next(ApiError.UnauthorizedError())

    req.body.user = user

    next()
  } catch (error) {
    return next(ApiError.UnauthorizedError())
  }
}
