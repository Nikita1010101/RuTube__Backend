import { Model } from 'sequelize'

import { SubscriptionModel, UserModel } from '../../models/index.model'
import { VideoHelperService } from '../video/video.helper.service'
import { ISubscription, IUser } from '../../types/user.types'
import { convertModelToArray } from '../../utils/convert-model-to-array/convert-model-to-array'
import { convertModelsToValuesArray } from '../../utils/convert-models-to-array/convert-models-to-id-array'

class SubscriptionService_class {
  public async getAll(profileId: number) {
    const subscriptions = await SubscriptionModel.findAll<Model<ISubscription>>({ where: { userId: profileId } })
    const subscriptionsId = convertModelsToValuesArray<ISubscription>(subscriptions, 'channelId')
    const users = await UserModel.findAll({ where: { id: subscriptionsId } })
    return users
  }

  public async getVideos(profileId: number) {
    const subscriptions = await SubscriptionModel.findAll({ where: { userId: profileId } })
    const subscriptionsId = convertModelsToValuesArray<ISubscription>(subscriptions, 'channelId')
    const videos = await VideoHelperService.getAllByUserId(subscriptionsId)
    return videos
  }

  public async getOne(subscriptionId: number) {
    const subscription = await UserModel.findOne<Model<IUser>>({ where: { id: subscriptionId } })
    const videos = await VideoHelperService.getAllByUserId(Number(subscriptionId))
    subscription.dataValues.videos = convertModelToArray(videos)
    return subscription
  }

  public async check(userId: number, channelId: number) {
    const subscription = await SubscriptionModel.findAll<Model<ISubscription>>({
      where: { userId, channelId },
    })
    const isSubscription = subscription.length !== 0
    return isSubscription
  }

  public async getLength(subscriptionId: number) {
    const subscripions = await SubscriptionModel.findAll<Model<ISubscription>>({
      where: { channelId: subscriptionId },
    })
    const length = subscripions.length
    return length
  }

  public async change({ userId, channelId }: ISubscription) {
    const subscripion = await SubscriptionModel.findOne({
      where: { userId: Number(userId), channelId: Number(channelId) },
    })

    if (subscripion) {
      await SubscriptionModel.destroy({
        where: { userId: Number(userId), channelId: Number(channelId) },
      })
    }

    await SubscriptionModel.create<Model<ISubscription>>({
      userId: Number(userId),
      channelId: Number(channelId),
    })
    return true
  }
}

export const SubscriptionService = new SubscriptionService_class()
