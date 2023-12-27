import { TVideo } from './video.types'

interface IUserDto {
	id?: number
	email: string
	name: string
	description: string
	avatarPath: string
	isActivated: boolean
	activationLink: string
	subscripions?: IUser[]
	subscribers?: IUser[]
	liked?: TVideo[]
	videos?: TVideo[]
}

interface IUser extends IUserDto {
	password: string
}

interface ISubscription {
	id: number
	userId: number
	channelId: number
}

interface ISubscriptionDto {
	userId: number
	channelId: number
}

export { IUser, IUserDto, ISubscription, ISubscriptionDto }
