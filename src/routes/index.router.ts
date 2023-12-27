import Router from 'express'

import { CommentRouter } from './comment.router'
import { LikeRouter } from './like.router'
import { UserRouter } from './user.router'
import { VideoRouter } from './video.router'
import { SubscriptionRouter } from './subscription.router'
import { MediaRouter } from './media.router'

const router = Router()

router.use('/comment', CommentRouter)
router.use('/like', LikeRouter)
router.use('/user', UserRouter)
router.use('/subscription', SubscriptionRouter)
router.use('/video', VideoRouter)
router.use('/media', MediaRouter)

export const MainRouter = router
