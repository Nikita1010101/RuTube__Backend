import { NextFunction, Request, RequestHandler, Response } from 'express'

import { Video, Comment, User, Likes, Subscription } from '../models/models'
import { ILikes, ILikesDto, IVideo } from '../types/video.type'
import { Model } from 'sequelize'

class VideoController {
	// create: RequestHandler = async (
	// 	req: Request,
	// 	res: Response,
	// 	next: NextFunction
	// ) => {
	// 	try {
	// 		if (Array.isArray(req.body)) {
	// 			;(req.body as IVideo[]).forEach(item => Video.create({ ...item }))
	// 		} else {
	// 			await Video.create(req.body)
	// 		}
	// 		res.send('All added!!!')
	// 	} catch (err) {
	// 		next()
	// 	}
	// }

	getAllVideos: RequestHandler<Record<string, any>, IVideo[]> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { search } = req.query

			const videos = (
				await Video.findAll({
					include: User
				})
			).filter(video =>
				video.dataValues.title
					.toLowerCase()
					.includes(search ? String(search).toLowerCase() : '')
			)

			res.send(videos)
		} catch (error) {
			next()
		}
	}

	getOneVideo: RequestHandler<Record<string, any>, IVideo> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { id } = req.params

			const video = await Video.findOne({
				where: { id },
				include: { model: User, as: 'user' }
			})

			res.send(video)
		} catch (error) {
			next()
		}
	}

	getAllSubscripionVideos: RequestHandler<Record<string, any>, IVideo[]> =
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				const { id } = req.params

				const subscriptionsId = (
					await Subscription.findAll({ where: { userId: id } })
				).map(subscription => subscription.dataValues.channelId)

				const videos = await Video.findAll({
					where: { userId: subscriptionsId },
					include: { model: User }
				})

				res.send(videos)
			} catch (error) {
				next()
			}
		}

	getLiked: RequestHandler<Record<string, any>, any, IVideo[]> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { id } = req.params

			const likesId = (
				await Likes.findAll({ where: { userId: Number(id) } })
			).map(likeId => likeId.dataValues.videoId)

			const likedVideos = await Video.findAll<Model<any, IVideo[]>>({
				where: { id: likesId },
				include: {
					model: User
				}
			})

			res.send(likedVideos)
		} catch (err) {
			next()
		}
	}

	getLikes: RequestHandler<Record<string, any>, ILikes[]> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { id } = req.params

			const likes = await Likes.findAll({
				where: { id }
			})

			res.send(likes)
		} catch (err) {
			next()
		}
	}

	getLikesLength: RequestHandler<Record<string, any>, number> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { id } = req.params

			const likesLength = (
				await Likes.findAll({
					where: { videoId: Number(id) }
				})
			).length

			res.send(String(likesLength))
		} catch (err) {
			next()
		}
	}

	checkLike: RequestHandler<Record<string, any>, boolean, ILikesDto> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { userId, videoId } = req.query

			const like = await Likes.findAll({ where: { userId, videoId } })

			const isLike = like.length !== 0

			res.send(isLike)
		} catch (err) {
			next()
		}
	}

	addView: RequestHandler<Record<string, any>, {}, { id: number }> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { id } = req.body

			const video = await Video.findOne({ where: { id } })

			await video.update({ views: video.dataValues.views + 1 })

			res.send({})
		} catch (err) {
			next()
		}
	}

	addLike: RequestHandler<Record<string, any>, {}, ILikesDto> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const body = req.body

			await Likes.create(body)

			res.send({})
		} catch (err) {
			next()
		}
	}

	removeLike: RequestHandler<Record<string, any>, {}, ILikesDto> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { userId, videoId } = req.body

			await Likes.destroy({ where: { userId, videoId } })

			res.send({})
		} catch (err) {
			next()
		}
	}
}

export default new VideoController()
