import { IComment } from "./comment.types"
import { IUser } from "./user.types"

export type TVideoAttachModels = {
  user?: IUser
  comments?: IComment[]
  likes?: IUser[]
}

export type TCreateVideBody = {
  title: string
  description: string
  videoPath: string
  previewPath: string
}

export type TVideo = TCreateVideBody & TVideoAttachModels & {
  id?: number
  views: number
  duration: number
  userId: number
}