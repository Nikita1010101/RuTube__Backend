import Router from 'express'

import { UserController } from '../controllers/user.controller'

const router = Router()

const { getAll, getOne } = UserController

router.get('/', getAll)
router.get('/:id', getOne)

export const UserRouter = router
