import { static as Static, Router } from 'express'

import { AUDIOS_PATH, AVATARS_PATH, PREVIEWS_PATH, VIDEOS_PATH } from '../constants/media.constant'

const router = Router()

router.use('/audios', Static(AUDIOS_PATH))
router.use('/avatars', Static(AVATARS_PATH))
router.use('/previews', Static(PREVIEWS_PATH))
router.use('/videos', Static(VIDEOS_PATH))

export const MediaRouter = router
