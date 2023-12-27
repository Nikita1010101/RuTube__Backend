import { Model } from 'sequelize'

import { UserModel, VideoModel } from '../../models/index.model'
import { TVideo, TCreateVideBody } from '../../types/video.types'
import { ApiError } from '../../exceptions/api.error'
import { VIDEO_ERROR } from '../../constants/errors.constant'

class VideoService_class {
  public async getAll() {
    const videos = await VideoModel.findAll<Model<TVideo>>({
      include: {
        model: UserModel,
        attributes: {
          exclude: ['password'],
        },
      },
    })

    return videos
  }

  public async create(body: TCreateVideBody) {
    const video = await VideoModel.create<Model<TVideo>>()
    return video
  }

  public async updateText(videoId: number, title: string, description: string) {
    const video = await VideoModel.findOne<Model<TVideo>>({ where: { id: videoId } })

    if (!video) throw ApiError.InternalServerError(VIDEO_ERROR.videoNotFound)

    video.update({ title, description })

    return true
  }

  public async updateVideo(videoId: number, videoUrl: string) {
    const video = await VideoModel.findOne<Model<TVideo>>({ where: { id: videoId } })

    if (!video) throw ApiError.InternalServerError(VIDEO_ERROR.videoNotFound)

    video.update({ videoPath: videoUrl })

    return true
  }

  public async updatePreview(videoId: number, videoPreviewUrl: string) {
    const video = await VideoModel.findOne<Model<TVideo>>({ where: { id: videoId } })

    if (!video) throw ApiError.InternalServerError(VIDEO_ERROR.videoNotFound)

    video.update({ videoPath: videoPreviewUrl })

    return true
  }

  public async getOne(videoId: number) {
    const video = await VideoModel.findOne({
      where: { id: videoId },
      include: {
        model: UserModel,
        attributes: {
          exclude: ['password'],
        },
        as: 'user',
      },
    })

    if (!video) throw ApiError.InternalServerError(VIDEO_ERROR.videoNotFound)

    return video
  }

  public async addView(videoId: number) {
    const video = await VideoModel.findOne<Model<TVideo>>({ where: { id: videoId } })

    if (!video) throw ApiError.InternalServerError(VIDEO_ERROR.videoNotFound)

    await video.increment('views')

    return true
  }
}

export const VideoService = new VideoService_class()
