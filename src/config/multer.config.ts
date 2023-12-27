import multer from 'multer'
import { v4 as createUniqueId } from 'uuid'

const videoStoreage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/videos')
  },
  filename: (req, file, callback) => {
    callback(null, `${createUniqueId()}.jpg`)
  },
})

export const videoUpload = multer({ storage: videoStoreage })