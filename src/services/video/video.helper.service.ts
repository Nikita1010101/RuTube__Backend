import { Model } from 'sequelize'

import { TVideo } from '../../types/video.types'
import { UserModel, VideoModel } from '../../models/index.model'

class VideoHelperService_class {
  public async getAllById(videoId: number | number[]) {
    const videos = await VideoModel.findAll<Model<TVideo>>({
      where: { id: videoId },
      include: { model: UserModel },
    })
    return videos
  }

  public async getAllByUserId(userId: number | number[]) {
    const videos = await VideoModel.findAll<Model<TVideo>>({
      where: { userId },
      include: { model: UserModel, as: 'user' },
    })
    return videos
  }
}

export const VideoHelperService = new VideoHelperService_class()
