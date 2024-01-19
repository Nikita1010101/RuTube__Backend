import { NextFunction, Request, RequestHandler, Response } from 'express'

import { LikeService } from '../services/like/like.service'
import { TLikeQuery } from '../types/request.types'
import { TLike } from '../types/like.types'
import { TUser } from '../types/user.types'
import { TVideoId } from '../types/id.types'

class LikeController_class {
  public change: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: profileId } = req.body.user as TUser
      const { videoId } = req.body as TVideoId

      await LikeService.change(+profileId, +videoId)

      res.send({ success: true })
    } catch (error) {
      next(error)
    }
  }

  public check: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: profileId } = req.body.user as TUser
      const { videoId } = req.query as TVideoId

      const isLike = await LikeService.check(+profileId, +videoId)

      res.send(isLike)
    } catch (error) {
      next(error)
    }
  }

  public getLength: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { videoId } = req.params as TVideoId

      const length = await LikeService.getLength(+videoId)

      res.send(length)
    } catch (error) {
      next(error)
    }
  }

  public getVideos: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: profileId } = req.body.user as TUser

      const video = await LikeService.getVideos(+profileId)

      res.send(video)
    } catch (error) {
      next(error)
    }
  }
}

export const LikeController = new LikeController_class()
