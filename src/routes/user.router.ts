import Router from 'express'
import { body } from 'express-validator'
import userController from '../controllers/user.controller'

const router = Router()

// router.post('/', userController.create)

router.get('/', userController.getUsers)
router.get('/:id', userController.getUser)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/subscriptions/:id', userController.getAllSubscriptions)
router.get('/subscription/:id', userController.getSubscriptionById)
router.get('/subscriptions', userController.checkSubscription)
router.get('/subscriptions-length/:id', userController.getSubscriptionsLength)

router.post('/profile', userController.getProfile)
router.post(
	'/registration',
	body('email').isEmail(),
	body('password').isLength({ min: 8, max: 32 }),
	userController.registration
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/subscription', userController.addSubscription)

router.patch('/edit', userController.editProfile)

router.delete('/subscription', userController.removeSubscription)

export default router
