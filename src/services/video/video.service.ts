import { Model, Op } from 'sequelize'

import { UserModel, VideoModel } from '../../models/index.model'
import { TVideo, TVideoSortingKeys } from '../../types/video.types'
import { ApiError } from '../../exceptions/api.error'
import { VIDEO_ERROR } from '../../constants/errors.constant'
import { PREVIEWS_PATH, VIDEOS_PATH } from '../../constants/media.constant'
import { VIDEO_SORTING_OPTIONS } from '../../constants/sorting.constant'

class VideoService_class {
  public async getAllMy(profileId: number, sortOption: TVideoSortingKeys = 'last') {
    const sortOptions = VIDEO_SORTING_OPTIONS[sortOption]

    const videos = await VideoModel.findAll<Model<TVideo>>({
      attributes: {
        exclude: ['description', 'videoUrl', 'public', 'userId'],
      },
      where: { userId: profileId },
      order: sortOptions,
      include: {
        model: UserModel,
        attributes: {
          exclude: ['email', 'password', 'description', 'activationId', 'isActivated'],
        },
      },
    })

    return videos
  }

  public async getAll(searchText: string = '', sortOption: TVideoSortingKeys = 'last') {
    const searchTemplate = `%${searchText}%`

    const sortOptions = VIDEO_SORTING_OPTIONS[sortOption]

    const videos = await VideoModel.findAll<Model<TVideo>>({
      attributes: {
        exclude: ['description', 'videoUrl', 'public', 'userId'],
      },
      where: {
        public: true,
        [Op.or]: [
          {
            title: {
              [Op.iLike]: searchTemplate,
            },
          },
          {
            description: {
              [Op.iLike]: searchTemplate,
            },
          },
        ],
      },
      order: sortOptions,
      include: {
        model: UserModel,
        attributes: {
          exclude: ['email', 'password', 'description', 'activationId', 'isActivated'],
        },
      },
    })

    return videos
  }

  public async create(userId: number) {
    const video = await VideoModel.create<Model<TVideo>>({ userId })

    const videoId = video.dataValues.id

    return videoId
  }

  public async updateContent(
    videoId: number,
    title: string,
    description: string,
    videoPreviewName: string
  ) {
    const video = await VideoModel.findOne<Model<TVideo>>({ where: { id: videoId } })

    if (!video) throw ApiError.InternalServerError(VIDEO_ERROR.videoNotFound)

    const videoPreviewUrl = `${process.env.API_URL}/${PREVIEWS_PATH}/${videoPreviewName}`

    video.update({ title, description, previewUrl: videoPreviewUrl })

    return true
  }

  public async updateVideo(videoId: number, videoName: string, duration: number) {
    const video = await VideoModel.findOne<Model<TVideo>>({ where: { id: videoId } })

    if (!video) throw ApiError.InternalServerError(VIDEO_ERROR.videoNotFound)

    const videoUrl = `${process.env.API_URL}/${VIDEOS_PATH}/${videoName}`

    video.update({ videoUrl, duration })

    return true
  }

  public async getOne(videoId: number) {
    const video = await VideoModel.findOne<Model<TVideo>>({
      where: {
        id: videoId,
        public: true,
      },
      include: {
        model: UserModel,
        attributes: {
          exclude: ['password', 'userId'],
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

  public async removeAll(profileId: number) {
    await VideoModel.destroy<Model<TVideo>>({ where: { userId: profileId } })

    return true
  }
}

export const VideoService = new VideoService_class()
