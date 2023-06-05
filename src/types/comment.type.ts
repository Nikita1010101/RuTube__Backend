interface IComment {
  userName: string
  content: string
}

interface ICommentDto {
  avatarPath: string
  userName: string 
  content: string 
} 

export { IComment, ICommentDto }