import { NextFunction, Request, RequestHandler, Response } from 'express'

import { TComment, TEditComment } from '../types/comment.types'
import { CommentService } from '../services/comment/comment.service'
import { TCommentId, TVideoId } from '../types/id.types'

class CommentController_class {
  public add: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as TComment

      await CommentService.add(body)

      res.send({ success: true })
    } catch (error) {
      next(error)
    }
  }

  public edit: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { commentId, content } = req.body as TEditComment

      await CommentService.edit(+commentId, content)

      res.send({ success: true })
    } catch (error) {
      next(error)
    }
  }
  
  public getAll: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { videoId } = req.params as TVideoId

      const comments = await CommentService.getAll(+videoId)

      res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  public remove: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { commentId } = req.params as TCommentId

      await CommentService.remove(+commentId)

      res.send({ success: true })
    } catch (error) {
      next(error)
    }
  }
}

export const CommentController = new CommentController_class()
