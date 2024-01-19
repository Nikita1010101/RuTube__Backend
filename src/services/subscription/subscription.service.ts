import { Model } from 'sequelize'

import { SubscriptionModel, UserModel, VideoModel } from '../../models/index.model'
import { TUser } from '../../types/user.types'
import { convertModelToArray } from '../../helpers/convert-model-to-array/convert-model-to-array'
import { convertModelsToValuesArray } from '../../helpers/convert-models-to-values-array/convert-models-to-values-array'
import { TSubscription } from '../../types/subscription.types'
import { TVideo } from '../../types/video.types'
import { ApiError } from '../../exceptions/api.error'
import { SUBSCRIPTION_ERROR } from '../../constants/errors.constant'

class SubscriptionService_class {
  public async change(profileId: number, channelId: number) {
    if (profileId === channelId) throw ApiError.BadRequest(SUBSCRIPTION_ERROR.idNotBeEquals)

    const subscription = await SubscriptionModel.findOne<Model<TSubscription>>({
      where: { profileId, channelId },
    })

    subscription
      ? await SubscriptionModel.destroy<Model<TSubscription>>({ where: { profileId, channelId } })
      : await SubscriptionModel.create<Model<TSubscription>>({ profileId, channelId })

    return true
  }

  public async check(profileId: number, channelId: number) {
    if (profileId === channelId) throw ApiError.BadRequest(SUBSCRIPTION_ERROR.idNotBeEquals)

    const subscription = await SubscriptionModel.count<Model<TSubscription>>({
      where: { profileId, channelId },
    })

    const isSubscription = Boolean(subscription)

    return { isSubscription }
  }

  public async getAll(profileId: number) {
    const subscriptions = await SubscriptionModel.findAll<Model<TSubscription>>({
      attributes: ['channelId'],
      where: { profileId },
    })
    const subscriptionsId = convertModelsToValuesArray<TSubscription>(subscriptions, 'channelId')
    const users = await UserModel.findAll({
      attributes: ['id', 'name', 'avatarUrl'],
      where: { id: subscriptionsId },
      order: [['updatedAt', 'DESC']],
    })

    return users
  }

  public async getLength(profileId: number) {
    const length = await SubscriptionModel.count<Model<TSubscription>>({
      where: { profileId },
    })

    return { length }
  }

  public async getOne(channelId: number) {
    const user = await UserModel.findOne<Model<TUser>>({
      attributes: ['id', 'name', 'description', 'avatarUrl'],
      where: { id: channelId },
    })

    const videos = await VideoModel.findAll<Model<TVideo>>({
      attributes: {
        exclude: ['description', 'videoUrl', 'public', 'userId'],
      },
      where: {
        userId: channelId,
        public: true,
      },
      include: {
        attributes: ['id', 'name', 'avatarUrl'],
        model: UserModel,
      },
    })

    user.dataValues.videos = convertModelToArray(videos)

    return user
  }

  public async getVideos(profileId: number) {
    const subscriptions = await SubscriptionModel.findAll<Model<TSubscription>>({
      attributes: ['channelId'],
      where: { profileId },
    })

    const subscriptionsId = convertModelsToValuesArray<TSubscription>(subscriptions, 'channelId')

    const videos = await VideoModel.findAll<Model<TVideo>>({
      attributes: {
        exclude: ['description', 'videoUrl', 'public', 'userId'],
      },
      where: { userId: subscriptionsId },
      order: [['updatedAt', 'DESC']],
      include: {
        attributes: ['id', 'name', 'avatarUrl'],
        model: UserModel,
      },
    })
    return videos
  }

  public async removeAll(profileId: number) {
    await SubscriptionModel.destroy<Model<TSubscription>>({ where: { profileId } })

    return true
  }
}

export const SubscriptionService = new SubscriptionService_class()
