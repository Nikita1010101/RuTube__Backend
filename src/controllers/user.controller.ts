import { NextFunction, Request, RequestHandler, Response } from 'express'
import { Subscription, User, Video } from '../models/models'
import { ISubscriptionDto, IUser, IUserDto } from '../types/user.type'
import { Model } from 'sequelize'

class UserController {
	getAllUsers: RequestHandler<Record<string, any>, IUser[]> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const users = await User.findAll()

			res.send(users)
		} catch (error) {
			next()
		}
	}

	getOneUser: RequestHandler<Record<string, any>, IUser> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { id } = req.params

			const user = await User.findOne({ where: { id } })

			const videos = await Video.findAll({
				where: { userId: user.dataValues.id },
				include: { model: User }
			})

			user.dataValues.videos = videos

			res.send(user)
		} catch (error) {
			next()
		}
	}

	getProfile: RequestHandler<Record<string, any>, IUser> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { email, password } = req.body

			const user = await User.findOne({ where: { email, password } })

			res.send(user)
		} catch (error) {
			next()
		}
	}

	editProfile: RequestHandler<Record<string, any>, IUser> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { id, name, description } = req.body

			const user = await User.findOne({ where: { id } })

			await user.update({ name, description })

			res.send({})
		} catch (error) {
			next()
		}
	}

	getAuthUser: RequestHandler<Record<string, any>, IUser> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { id } = req.params

			const subscriptionsId = (
				await Subscription.findAll<Model<any, any>>({ where: { userId: id } })
			).map(item => item.dataValues.channelId)

			const user = await User.findOne<Model<any, IUser>>({ where: { id } })

			const subscriptions = await User.findAll<Model<any, IUser[]>>({
				where: { id: subscriptionsId }
			})

			user.dataValues.subscriptions = subscriptions

			res.send(user)
		} catch (error) {
			next()
		}
	}

	createUser: RequestHandler<Record<string, any>, IUser, IUserDto> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const body = req.body

			const user = await User.create(body)

			res.send(user)
		} catch (error) {
			next()
		}
	}

	getAllSubscriptions: RequestHandler<Record<string, any>, IUser[]> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { id } = req.params

			const subscriptionsId = (
				await Subscription.findAll({
					where: { userId: Number(id) }
				})
			).map(table => table.dataValues.channelId)

			const subscriptions = await User.findAll({
				where: { id: subscriptionsId }
			})

			res.send(subscriptions)
		} catch (err) {
			next()
		}
	}

	getSubscriptionById: RequestHandler<Record<string, any>, IUser> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { id } = req.params

			const subscription = await User.findOne({
				where: { id },
				include: { model: Video, as: 'videos' }
			})

			res.send(subscription)
		} catch (err) {
			next()
		}
	}

	checkSubscription: RequestHandler<
		Record<string, any>,
		Boolean,
		ISubscriptionDto
	> = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId, channelId } = req.query

			const subscription = await Subscription.findAll({
				where: { userId, channelId }
			})

			const isSubscription = subscription.length !== 0

			res.send(isSubscription)
		} catch (err) {
			next()
		}
	}

	getSubscriptionsLength: RequestHandler<Record<string, any>, number> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { id } = req.params

			const subscripionsLength = (
				await Subscription.findAll({ where: { channelId: id } })
			).length

			res.send(String(subscripionsLength))
		} catch (err) {
			next()
		}
	}

	addSubscription: RequestHandler<Record<string, any>, any, ISubscriptionDto> =
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				const body = req.body

				await Subscription.create(body)

				res.send({})
			} catch (err) {
				next()
			}
		}

	removeSubscription: RequestHandler<
		Record<string, any>,
		any,
		ISubscriptionDto
	> = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId, channelId } = req.body

			await Subscription.destroy({ where: { userId, channelId } })

			res.send({})
		} catch (err) {
			next()
		}
	}
}

export default new UserController()
