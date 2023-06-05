import { IComment } from "./comment.type"
import { IUser } from "./user.type"

interface IVideo {
  id?: number
  title: string
  description: string
  videoPath: string
  previewPath: string
  views: number
  duration: number
  userId: number
  user?: IUser
  comments?: Array<IComment>
  likes?: Array<IUser>
}

interface ILikes {
	id?: number 
	userId: number
	videoId: number
}

interface ILikesDto {
  userId: number
  videoId: number
}

export { IVideo, ILikes, ILikesDto }