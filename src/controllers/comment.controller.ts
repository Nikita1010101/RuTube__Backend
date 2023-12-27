import { NextFunction, Request, RequestHandler, Response } from 'express'

import { IComment } from '../types/comment.types'
import { CommentService } from '../services/comment/comment.service'

class CommentController_class {
  public getAll: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string }
      const comments = await CommentService.getAllById(Number(id))
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  public add: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as IComment
      await CommentService.add(body)
      res.send({})
    } catch (error) {
      next(error)
    }
  }

  public remove: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string }
      await CommentService.remove(Number(id))
      res.send({})
    } catch (error) {
      next(error)
    }
  }
}

export const CommentController = new CommentController_class()
