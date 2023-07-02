import Router from 'express'
import commentController from '../controllers/comment.controller'

const router = Router()

router.get('/:id', commentController.getAllComments)

router.post('/', commentController.addComment)

router.delete('/', commentController.removeComment)

export default router