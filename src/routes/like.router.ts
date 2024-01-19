import { Router } from 'express'

import { LikeController } from '../controllers/like.controller'
import { authMiddleWare } from '../middlewares/auth.middleware'

const router = Router()

const { change, check, getLength, getVideos } = LikeController

router.get('/video', authMiddleWare, getVideos)
router.get('/check/:videoId', authMiddleWare, check)
router.get('/length/:videoId', authMiddleWare, getLength)

router.post('/change', change)

export const LikeRouter = router