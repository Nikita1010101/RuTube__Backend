import { NextFunction, Request, RequestHandler, Response } from 'express'

import { SubscriptionService } from '../services/subscription/subscription.service'
import { TRequest } from '../types/request.types'
import { ISubscription } from '../types/user.types'

class SubscriptionConstroller_class {
  public getAll: RequestHandler = async (req: TRequest, res: Response, next: NextFunction) => {
    try {
      const { id: profileId } = req.user
      const users = await SubscriptionService.getAll(Number(profileId))
      res.send(users)
    } catch (error) {
      next(error)
    }
  }

  public getVideos: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { videoId } = req.params as { videoId: string }
      console.log(videoId)
      const videos = await SubscriptionService.getVideos(Number(videoId))
      res.send(videos)
    } catch (error) {
      next(error)
    }
  }

  public getOne: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { subscriptionId } = req.params as { subscriptionId: string }
      const subscription = await SubscriptionService.getOne(Number(subscriptionId))
      res.send(subscription)
    } catch (error) {
      next(error)
    }
  }

  public check: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, channelId } = req.query
      const isSubscription = await SubscriptionService.check(Number(userId), Number(channelId))
      res.send(isSubscription)
    } catch (error) {
      next(error)
    }
  }

  public getLength: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { subscriptionId } = req.params
        const length = await SubscriptionService.getLength(Number(subscriptionId))
      res.send(length)
    } catch (error) {
      next(error)
    }
  }

  public change: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as ISubscription
      await SubscriptionService.change(body)
      res.send({})
    } catch (error) {
      next(error)
    }
  }
}

export const SubscriptionConstroller = new SubscriptionConstroller_class()
