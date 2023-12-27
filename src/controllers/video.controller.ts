import { NextFunction, Request, RequestHandler, Response } from 'express'

import { VideoService } from '../services/video/video.service'
import { ParsedQs } from '../types/request.types'

class VideoController_class {
  public getAll: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { search } = req.query as ParsedQs & { search: string }
      const videos = await VideoService.getAll()
      res.send(videos)
    } catch (error) {
      next(error)
    }
  }

  public getOne: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { videoId } = req.params as { videoId: string }
      const video = await VideoService.getOne(Number(videoId))
      res.send(video)
    } catch (error) {
      next(error)
    }
  }

  public addView: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { videoId } = req.body as { videoId: string }
      await VideoService.addView(Number(videoId))
      res.send({})
    } catch (error) {
      next(error)
    }
  }

  public create: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fileName = req.file.filename
      res.send({ url: fileName })
    } catch (error) {
      next(error)
    }
  }
}

export const VideoController = new VideoController_class()
