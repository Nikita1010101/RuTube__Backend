import MailService from './email.service'
import { UserModel } from '../models/user.model'
import bcrypt from 'bcrypt'
import { v4 } from 'uuid';
import TokenService from './token.service'
import { UserDto } from '../dtos/user.dto'
import { ApiError } from '../exceptions/api.error'
import tokenService from './token.service'

class UserService {
	async registration(email: string, password: string, name: string) {
		const isAccaunt = await UserModel.findOne({ where: { email } })

		if (isAccaunt) {
			throw ApiError.BadRequest(
				`Пользователь с почтовым адерессом ${email} уже существует!`
			)
		}

		const hashPassword = await bcrypt.hash(password, 5)
		const activationLink = v4()

		const user = await UserModel.create({
			email,
			password: hashPassword,
			name,
			activationLink
		})
		await MailService.sendActiovationMail(
			email,
			`${process.env.API_URL}/api/activate/${activationLink}`
		)

		const userDto = new UserDto(user)
		const tokens = await TokenService.genereteTokens({ ...userDto })

		await TokenService.saveToken(userDto.id, tokens.refreshToken)

		return { ...tokens, user: userDto }
	}

	async auth(email: string, password: string) {
		const hashPassword = bcrypt.hash(password, 5)

		const user = await UserModel.findOne({
			where: { email, password: hashPassword }
		})

		if (!user) {
			throw new Error('Неверный логин или пароль!')
		}

		return user
	}

	async logout(refreshToken: string) {
		const token = await tokenService.removeToken(refreshToken)
		return token
	}

	async activate(activationLink: string) {
		const user = await UserModel.findOne({ where: { activationLink } })

		if (!user) {
			throw ApiError.BadRequest('Некорректная ссылка активации!')
		}

		user.dataValues.isActivated = true
		await user.save()
	}

	async refresh() {}
}

export default new UserService()
