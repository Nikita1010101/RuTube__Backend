import Router from 'express'

import { CommentController } from '../controllers/comment.controller'
import { authMiddleWare } from '../middlewares/auth.middleware'

const router = Router()

const { add, edit, getAll, remove } = CommentController

router.get('/:videoId', getAll)

router.post('/add', authMiddleWare, add)

router.patch('/edit', authMiddleWare, edit)

router.delete('/remove/:commentId', authMiddleWare, remove)

export const CommentRouter = router
