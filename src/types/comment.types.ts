interface ICommentDto {
  id: string
  avatarPath: string
  userName: string
  content: string
}

interface IComment extends ICommentDto {
  videoId: number
}

export { IComment, ICommentDto }
