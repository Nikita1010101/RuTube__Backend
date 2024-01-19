import Router from 'express'

import { VideoController } from '../controllers/video.controller'
import { previewUpload, videoUpload } from '../config/multer.config'
import { authMiddleWare } from '../middlewares/auth.middleware'

const router = Router()

const { addView, create, getAll, getAllMy, getOne, updateContent, updateVideo } = VideoController

router.get('/', getAll)
router.get('/:videoId', getOne)
router.get('/get/my', authMiddleWare, getAllMy)

router.post('/create', authMiddleWare, create)

router.patch('/update/content', authMiddleWare, previewUpload.single('preview'), updateContent)
router.patch('/update/video', authMiddleWare, videoUpload.single('video'), updateVideo)
router.patch('/view', addView)

export const VideoRouter = router
