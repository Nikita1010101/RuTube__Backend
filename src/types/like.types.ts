interface ILike {
	id?: number 
	userId: number
	videoId: number
}

interface ILikeDto {
  userId: number
  videoId: number
}

export { ILike, ILikeDto }