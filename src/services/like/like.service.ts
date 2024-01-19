import { Model } from 'sequelize'

import { LikeModel, UserModel, VideoModel } from '../../models/index.model'
import { TLike } from '../../types/like.types'
import { ApiError } from '../../exceptions/api.error'
import { TOTAL_ERROR } from '../../constants/errors.constant'
import { convertModelsToValuesArray } from '../../helpers/convert-models-to-values-array/convert-models-to-values-array'

class LikeService_class {
  public async change(userId: number, videoId: number) {
    const like = await LikeModel.findOne<Model<TLike>>({ where: { userId, videoId } })

    like ? like.destroy() : await LikeModel.create<Model<TLike>>({ userId, videoId })

    return true
  }

  public async check(userId: number, videoId: number) {
    const likes = await LikeModel.findAll<Model<TLike>>({ where: { userId, videoId } })

    const isLike = likes.length !== 0

    return isLike
  }

  public async getLength(videoId: number) {
    const likesLength = await LikeModel.count<Model<TLike>>({ where: { videoId } })

    return String(likesLength)
  }

  public async getVideos(userId: number) {
    if (!userId) throw ApiError.BadRequest(TOTAL_ERROR.notCorrectId)

    const likes = await LikeModel.findAll<Model<TLike>>({ where: { userId } })

    const likedId = convertModelsToValuesArray<TLike>(likes, 'videoId')

    const videos = await VideoModel.findAll({
      attributes: {
        exclude: ['description', 'videoUrl', 'public', 'userId']
      },
      where: { id: likedId },
      order: [['updatedAt', 'DESC']],
      include: {
        model: UserModel,
        attributes: {
          exclude: ['email', 'password', 'description', 'activationId', 'isActivated'],
        },
      },
    })

    return videos
  }

  public async removeAll(profileId: number) {
    await LikeModel.destroy<Model<TLike>>({ where: { userId: profileId } })

    return true
  }
}

export const LikeService = new LikeService_class()
