import { Router } from 'express'

import { AuthController } from '../controllers/auth.controller'
import { validationMiddleWare } from '../middlewares/validation.middleware'
import { authMiddleWare } from '../middlewares/auth.middleware'

const router = Router()

const { activate, remove, edit, login, logout, refresh, registration } = AuthController

router.get('/activate/:activationId', activate)
router.get('/refresh', refresh)

router.post('/login', login)
router.post('/logout', logout)
router.post('/registration', validationMiddleWare(), registration)

router.patch('/edit', authMiddleWare, edit)

router.delete('/remove', authMiddleWare, remove)

export const AuthRouter = router
