import { TCommentId } from "./id.types"
import { TUser } from "./user.types"

export type TCommentAttachModels = {
  user?: TUser
}

export type TComment = TCommentAttachModels & {
  id: string
  content: string
  userId: number
  videoId: number
}

export type TEditComment = Pick<TComment, 'content'> & TCommentId
