import Router from 'express'

import { AuthRouter } from './auth.router'
import { CommentRouter } from './comment.router'
import { LikeRouter } from './like.router'
import { MediaRouter } from './media.router'
import { SubscriptionRouter } from './subscription.router'
import { UserRouter } from './user.router'
import { VideoRouter } from './video.router'

const router = Router()

router.use('/auth', AuthRouter)
router.use('/comment', CommentRouter)
router.use('/like', LikeRouter)
router.use('/media', MediaRouter)
router.use('/subscription', SubscriptionRouter)
router.use('/user', UserRouter)
router.use('/video', VideoRouter)

export const MainRouter = router
