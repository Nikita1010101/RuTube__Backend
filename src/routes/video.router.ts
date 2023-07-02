import Router from 'express'
import videoController from '../controllers/video.controller'

const router = Router()

// router.post('/', videoController.create)
router.get('/', videoController.getAllVideos)
router.get('/:id', videoController.getOneVideo)
router.get('/subscriptions/:id', videoController.getAllSubscripionVideos)
router.get('/liked/:id', videoController.getLiked)
router.get('/likes/:id', videoController.getLikes)
router.get('/likes', videoController.checkLike)
router.get('/likes-length/:id', videoController.getLikesLength)

router.post('/like', videoController.addLike)

router.patch('/view', videoController.addView)

router.delete('/like', videoController.removeLike)

export default router
