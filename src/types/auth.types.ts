import { TUser } from './user.types'

export type TEditBody = Partial<Pick<TUser, 'avatarUrl' | 'description' | 'name'>>

export type TLoginBody = Pick<TUser, 'email' | 'password'>

export type TRegistrationBody = Pick<TUser, 'email' | 'name' | 'password'>
