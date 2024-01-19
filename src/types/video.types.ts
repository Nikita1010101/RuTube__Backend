import type { OrderItem } from 'sequelize'

import { TComment } from './comment.types'
import { TVideoId } from './id.types'
import { TUser } from './user.types'

export type TVideoAttachModels = {
  user?: TUser
  comments?: TComment[]
  likes?: TUser[]
}

export type TVideo = TVideoAttachModels & {
  id: number
  title: string
  description: string
  views: number
  duration: number
  videoUrl: string
  previewUrl: string
  public: true
  userId: number
}

export type TUpdateVideoContentBody = TVideoId & Pick<TVideo, 'title' | 'description'>

export type TUploadVideoBody = Pick<TVideo, 'duration'> & TVideoId

export type TVideoSorting = {
  last: string
  old: string
  popular: string
}

export type TVideoSortingKeys = keyof TVideoSorting

export type TVideoSortingOptions = Record<TVideoSortingKeys, OrderItem[]>
