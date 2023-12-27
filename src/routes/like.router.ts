import { Router } from 'express'

import { LikeController } from '../controllers/like.controller'

const router = Router()

const { change, check, getLength, getVideos } = LikeController

router.get('/', getVideos)
router.get('/check/:videoId', check)
router.get('/length/:videoId', getLength)

router.post('/change', change)

// router.delete('/remove/:videoId', remove)

export const LikeRouter = router