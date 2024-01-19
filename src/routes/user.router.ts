import Router from 'express'

import { UserController } from '../controllers/user.controller'

const router = Router()

const { getOne } = UserController

router.get('/:userId', getOne)

export const UserRouter = router
