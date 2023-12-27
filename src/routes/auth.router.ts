import { Router } from 'express'
import { body } from 'express-validator'

const router = Router()

router.get('/activate/:link')
router.get('/refresh')

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 8, max: 32 })
)
router.post('/login')
router.post('/logout')

router.patch('/edit')

router.delete('/remove/:id')

export const AuthRouter = router
