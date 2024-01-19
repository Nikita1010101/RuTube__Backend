import { Router } from 'express'

import { SubscriptionController } from '../controllers/subscription.controller'
import { authMiddleWare } from '../middlewares/auth.middleware'

const router = Router()

const { change, check, getAll, getLength, getOne, getVideos } = SubscriptionController

router.get('/', authMiddleWare, getAll)
router.get('/:channelId', authMiddleWare, getOne)
router.get('/get/video', authMiddleWare, getVideos)
router.get('/check/:channelId', authMiddleWare, check)
router.get('/length/:channelId', authMiddleWare, getLength)

router.post('/change', authMiddleWare, change)

export const SubscriptionRouter = router
