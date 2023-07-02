import { NextFunction, Request, RequestHandler, Response } from 'express'
import { validationResult } from 'express-validator/src/validation-result'
import { UserModel } from '../models/user.model'
import { VideoModel } from '../models/video.model'
import { SubscriptionModel } from '../models/subscription.model'
import { ISubscriptionDto, IUser, IUserDto } from '../types/user.type'
import { Model } from 'sequelize'
import UserService from '../services/user.service'
import { ApiError } from '../exceptions/api.error'

class UserController {
	registration: RequestHandler<Record<string, any>, IUser> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
			}

			const { email, password } = req.body

			const user = await UserService.registration(email, password, 'nike')

			res.cookie('refreshToken', user.refreshToken, {
				maxAge: 1000 * 60 * 60 * 24 * 30,
				httpOnly: true
			})

			res.send(user)
		} catch (error) {
			next(error)
		}
	}

	login: RequestHandler<Record<string, any>, IUser> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			
		} catch (error) {
			next(error)
		}
	}

	activate: RequestHandler<Record<string, any>, IUser> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const activationLink = req.params.link
			await UserService.activate(activationLink)
			return res.redirect(process.env.CLIENT_URL)
		} catch (error) {
			next(error)
		}
	}

	logout: RequestHandler<Record<string, any>, IUser> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { refreshToken } = req.cookies
			const token = await UserService.logout(refreshToken)
			res.clearCookie('refreshToken')
			return res.json(token)
		} catch (error) {
			next(error)
		}
	}

	refresh: RequestHandler<Record<string, any>, IUser> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
		} catch (error) {
			next(error)
		}
	}

	

	getUsers: RequestHandler<Record<string, any>, IUser[]> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const users = await UserModel.findAll()

			res.send(users)
		} catch (error) {
			next()
		}
	}

	getUser: RequestHandler<Record<string, any>, IUser> = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { id } = req.params

			const user = await UserModel.findOne({ where: { id } })

			const videos = await VideoModel.findAll({
				where: { userId: user.dataValues.id },
				include: { model: UserModel }
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

			const user = await UserModel.findOne({ where: { email, password } })

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

			const user = await UserModel.findOne({ where: { id } })

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
				await SubscriptionModel.findAll<Model<any, any>>({ where: { userId: id } })
			).map(item => item.dataValues.channelId)

			const user = await UserModel.findOne<Model<any, IUser>>({ where: { id } })

			const subscriptions = await UserModel.findAll<Model<any, IUser[]>>({
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

			const user = await UserModel.create(body)

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
				await SubscriptionModel.findAll({
					where: { userId: Number(id) }
				})
			).map(table => table.dataValues.channelId)

			const subscriptions = await UserModel.findAll({
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

			const subscription = await UserModel.findOne({
				where: { id },
				include: { model: VideoModel, as: 'videos' }
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

			const subscription = await SubscriptionModel.findAll({
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
				await SubscriptionModel.findAll({ where: { channelId: id } })
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

				await SubscriptionModel.create(body)

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

			await SubscriptionModel.destroy({ where: { userId, channelId } })

			res.send({})
		} catch (err) {
			next()
		}
	}
}

export default new UserController()