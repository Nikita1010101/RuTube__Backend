import multer from 'multer'
import { v4 as createUniqueId } from 'uuid'

import type { Multer, StorageEngine } from 'multer'

const audioStorage: StorageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/audios')
  },
  filename: (req, file, callback) => {
    callback(null, `${createUniqueId()}.mp3`)
  },
})

const avatarStorage: StorageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/videos')
  },
  filename: (req, file, callback) => {
    callback(null, `${createUniqueId()}.jpg`)
  },
})

const previewStorage: StorageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/previews')
  },
  filename: (req, file, callback) => {
    callback(null, `${createUniqueId()}.jpg`)
  },
})

const videoStorage: StorageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/videos')
  },
  filename: (req, file, callback) => {
    callback(null, `${createUniqueId()}.mp4`)
  },
})

export const audioUpload: Multer = multer({ storage: audioStorage })

export const avatarUpload: Multer = multer({ storage: avatarStorage })

export const previewUpload: Multer = multer({ storage: previewStorage })

export const videoUpload: Multer = multer({ storage: videoStorage })
