import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

import { sequelize } from './db'
import { MainRouter } from './routes/index.router'
import { errorMiddleWare } from './middlewares/error.middleware'
import { MediaRouter } from './routes/media.router'

const PORT = process.env.PORT || 7000

const app = express()

app.use(cors({
	credentials: true,
	origin: process.env.CLIENT_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api', MainRouter)
app.use('/uploads', MediaRouter)
app.use(errorMiddleWare)

const start = async () => {
	try {
		await sequelize.authenticate()
    await sequelize.sync()

		app.listen(PORT, () => {
			console.log(`Сервер успешно запущен на ${PORT} порту!`)
		})
	} catch (error) {
		console.log(error)
	}
}

start()
