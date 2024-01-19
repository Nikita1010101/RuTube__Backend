import { NextFunction, Request, RequestHandler, Response } from 'express'

import { VideoService } from '../services/video/video.service'
import { TVideoQuery } from '../types/request.types'
import { TUpdateVideoContentBody, TUploadVideoBody } from '../types/video.types'
import { TFileName, TUserId, TVideoId } from '../types/id.types'
import { TUser } from '../types/user.types'

class VideoController_class {
  public addView: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { videoId } = req.body as TVideoId

      await VideoService.addView(+videoId)

      res.send({ success: true })
    } catch (error) {
      next(error)
    }
  }

  public create: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: profileId } = req.body.user as TUser

      const videoId = await VideoService.create(+profileId)

      res.send(videoId)
    } catch (error) {
      next(error)
    }
  }

  public getAll: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _search: searchText, _sort: sortOption } = req.query as TVideoQuery

      const videos = await VideoService.getAll(searchText, sortOption)

      res.send(videos)
    } catch (error) {
      next(error)
    }
  }

  public getAllMy: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: profileId } = req.body.user as TUser
      const { _sort: sortParams } = req.query as TVideoQuery

      const videos = await VideoService.getAllMy(+profileId, sortParams)

      res.send(videos)
    } catch (error) {
      next(error)
    }
  }

  public getOne: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { videoId } = req.params as TVideoId

      const video = await VideoService.getOne(+videoId)

      res.send(video)
    } catch (error) {
      next(error)
    }
  }

  public updateContent: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { videoId, title, description } = req.body as TUpdateVideoContentBody
      const { filename } = req.file as TFileName

      await VideoService.updateContent(+videoId, title, description, filename)

      res.send({ success: true })
    } catch (error) {
      next(error)
    }
  }

  public updateVideo: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { duration, videoId } = req.body as TUploadVideoBody
      const { filename } = req.file as TFileName

      console.log(req.file)

      await VideoService.updateVideo(+videoId, filename, +duration)

      res.send({ success: true })
    } catch (error) {
      next(error)
    }
  }
}

export const VideoController = new VideoController_class()
