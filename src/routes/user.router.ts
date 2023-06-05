import Router from 'express'
import userController from '../controllers/user.controller'

const router = Router()

// router.post('/', userController.create)

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getOneUser)
router.post('/profile', userController.getProfile)
router.patch('/edit', userController.editProfile)
router.get('/login/:id', userController.getAuthUser)
router.post('/register', userController.createUser)
router.get('/subscriptions/:id', userController.getAllSubscriptions)
router.get('/subscription/:id', userController.getSubscriptionById)
router.get('/subscriptions', userController.checkSubscription)
router.get('/subscriptions-length/:id', userController.getSubscriptionsLength)
router.post('/subscription', userController.addSubscription)
router.delete('/subscription', userController.removeSubscription)

export default router

