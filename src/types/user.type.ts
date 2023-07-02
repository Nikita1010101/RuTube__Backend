import { IVideo } from './video.type'

interface IUser {
	id?: number
	email: string
	password: string
	name: string
	description: string
	avatarPath: string
	subscripions?: Array<IUser>
	subscribers?: Array<IUser>
	liked?: Array<IVideo>
	videos?: Array<IVideo>
}

interface IUserDto {
	id: number
	email: string
	name: string
	description: string
	avatarPath: string
	isActivated: boolean
	activationLink: string
}

interface ISubscription {
	id?: number
	userId: number
	channelId: number
}

interface ISubscriptionDto {
	userId: number
	channelId: number
}

export { IUser, IUserDto, ISubscription, ISubscriptionDto }
