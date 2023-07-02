require('dotenv').config()
import expess from 'express'
import sequelize from './db'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './routes'
import { errorMiddleWare } from './middlewares/error.middleware'

const PORT = process.env.PORT || 7000

const app = expess()

app.use(cors())
app.use(cookieParser())
app.use(expess.json())
app.use('/api', router)
app.use(errorMiddleWare)

const start = async () => {
	try {
		await sequelize.authenticate()
    await sequelize.sync()
		app.listen(PORT, () => {
			console.log(`Сервер успешно запущен на ${PORT} порту!`)
		})
	} catch (err) {
		console.log(err)
	}
}

start()
