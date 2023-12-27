import { Model } from 'sequelize'

import { LikeModel, UserModel, VideoModel } from '../../models/index.model'
import { TVideo } from '../../types/video.types'
import { ILike } from '../../types/like.types'
import { ApiError } from '../../exceptions/api.error'
import { convertModelsToValuesArray } from '../../utils/convert-models-to-array/convert-models-to-id-array'
import { TOTAL_ERROR } from '../../constants/errors.constant'

class LikeService_class {
  public async getVideos(id: number) {
    if (!id) {
      throw ApiError.BadRequest(TOTAL_ERROR.notCorrectId)
    }

    const likes = await LikeModel.findAll<Model<ILike>>({ where: { userId: id } })
    // const likesId = likes.map(likeId => likeId.dataValues.videoId)
    const likesId = convertModelsToValuesArray<ILike>(likes, 'videoId')
    const likedVideos = await VideoModel.findAll<Model<TVideo>>({
      where: { id: likesId },
      include: { model: UserModel },
    })
    return likedVideos
  }

  public async check(userId: number, videoId: number) {
    const likes = await LikeModel.findAll<Model<ILike>>({ where: { userId, videoId } })
    const isLike = likes.length !== 0
    return isLike
  }

  public async getLength(id: number) {
    const likes = await LikeModel.findAll<Model<ILike>>({ where: { videoId: Number(id) } })
    const likesLength = likes.length
    return likesLength
  }

  public async change(userId: number, videoId: number) {
    const like = await LikeModel.findOne<Model<ILike>>({
      where: { userId: userId, videoId: videoId },
    })

    if (like) {
      await LikeModel.destroy<Model<ILike>>({
        where: { userId: userId, videoId: videoId },
      })
    } else {
      await LikeModel.create<Model<ILike>>({ userId: userId, videoId: videoId })
    }

    return true
  }
}

export const LikeService = new LikeService_class()
