import { NextFunction, Request, RequestHandler, Response } from 'express'

import { LikeService } from '../services/like/like.service'
import { ILike } from '../types/like.types'
import { ParsedQs } from '../types/request.types'

class LikeController_class {
  public getVideos: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string }
      const video = await LikeService.getVideos(Number(id))
      res.send(video)
    } catch (error) {
      next(error)
    }
  }

  public check: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, videoId } = req.query as ParsedQs & ILike
      const isLike = await LikeService.check(Number(userId), Number(videoId))
      res.send(isLike)
    } catch (error) {
      next(error)
    }
  }

  public getLength: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { videoId } = req.params as { videoId: string }
      const length = await LikeService.getLength(Number(videoId))
      res.send(String(length))
    } catch (error) {
      next(error)
    }
  }

  public change: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, videoId } = req.body as ILike
      await LikeService.change(Number(userId), Number(videoId))
      res.send({})
    } catch (error) {
      next(error)
    }
  }
}

export const LikeController = new LikeController_class()
