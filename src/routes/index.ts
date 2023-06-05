import Router from 'express'

const router = Router()

import userRouter from './user.router'
import videoRouter from './video.router'
import commentRouter from './comment.router'

router.use('/user', userRouter)
router.use('/video', videoRouter)
router.use('/comment', commentRouter)

export default router
