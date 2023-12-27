import Router from 'express'

import { CommentController } from '../controllers/comment.controller'

const router = Router()

const { add, getAll, remove } = CommentController

router.get('/:videoId', getAll)

router.post('/', add)

router.delete('/:commentId', remove)

export const CommentRouter = router
