import { TVideo } from './video.types'

export type TUserAttachModels = {
  subscriptions?: TUser[]
  subscribers?: TUser[]
  likes?: TVideo[]
  videos?: TVideo[]
}

export type TUser = TUserAttachModels & {
  id: number
  email: string
	password: string
  name: string
  description: string
  avatarUrl: string
  isActivated: boolean
  activationId: string
}

export type TUserDto = Omit<TUser, 'password'>

export type TUserKeys = keyof TUser
