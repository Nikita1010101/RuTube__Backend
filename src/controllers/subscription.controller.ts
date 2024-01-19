import { NextFunction, Request, RequestHandler, Response } from 'express'

import { SubscriptionService } from '../services/subscription/subscription.service'
import { TSubscription } from '../types/subscription.types'
import { TChannelId, TUserId } from '../types/id.types'
import { TSubscriptionQuery } from '../types/request.types'
import { TUser } from '../types/user.types'

class SubscriptionController_class {
  public change: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: profileId } = req.body.user as TUser
      const { channelId } = req.body as TChannelId

      await SubscriptionService.change(+profileId, +channelId)

      res.send({ success: true })
    } catch (error) {
      next(error)
    }
  }

  public check: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: profileId } = req.body.user as TUser
      const { channelId } = req.params as TChannelId

      const isSubscription = await SubscriptionService.check(+profileId, +channelId)

      res.send(isSubscription)
    } catch (error) {
      next(error)
    }
  }

  public getAll: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: profileId } = req.body.user as TUser

      const users = await SubscriptionService.getAll(+profileId)

      res.send(users)
    } catch (error) {
      next(error)
    }
  }

  public getLength: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { channelId } = req.params as TChannelId

      const length = await SubscriptionService.getLength(+channelId)

      res.send(length)
    } catch (error) {
      next(error)
    }
  }

  public getOne: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { channelId } = req.params as TChannelId

      const subscription = await SubscriptionService.getOne(+channelId)

      res.send(subscription)
    } catch (error) {
      next(error)
    }
  }

  public getVideos: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: profileId } = req.body.user as TUser

      const videos = await SubscriptionService.getVideos(+profileId)

      res.send(videos)
    } catch (error) {
      next(error)
    }
  }
}

export const SubscriptionController = new SubscriptionController_class()
