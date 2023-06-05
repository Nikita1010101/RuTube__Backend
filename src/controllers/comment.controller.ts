import { NextFunction, Request, RequestHandler, Response } from 'express'
import { IComment, ICommentDto } from '../types/comment.type'
import { Comment } from '../models/models'

class CommentController {
	getAllComments: RequestHandler<Record<string, any>, any, IComment[]> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { id } = req.params

			const comments = await Comment.findAll({ where: { videoId: id } })

			res.send(comments)
		} catch (error) {
			next()
		}
	}

	addComment: RequestHandler<Record<string, any>, any, ICommentDto> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const body = req.body

			await Comment.create(body)

			res.send({})
		} catch (error) {
			next()
		}
	}

	removeComment: RequestHandler<Record<string, any>, any, ICommentDto> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { avatarPath, userName, content, videoId } = req.body

			await Comment.destroy({
				where: { avatarPath, userName, content, videoId }
			})

			res.send({})
		} catch (error) {
			next()
		}
	}
}

export default new CommentController()
