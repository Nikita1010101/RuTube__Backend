import Router from 'express'

import { VideoController } from '../controllers/video.controller'
import { videoUpload } from '../config/multer.config'

const router = Router()

const { addView, create, getAll, getOne } = VideoController

router.get('/', getAll)
router.get('/:videoId', getOne)

router.post('/create', videoUpload.single('video'), create)

router.patch('/view', addView)

export const VideoRouter = router




