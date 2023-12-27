import { Router } from 'express'

import { SubscriptionConstroller } from '../controllers/subscription.controller'

const router = Router()

const { change, check, getAll, getLength, getOne, getVideos } = SubscriptionConstroller

router.get('/', getAll)
router.get('/video/:videoId', getVideos)
router.get('/:userId', getOne)
router.get('/check/:userId', check)
router.get('/length/:userId', getLength)

router.post('/change', change)

export const SubscriptionRouter = router