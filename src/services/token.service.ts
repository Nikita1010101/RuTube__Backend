import jwt from 'jsonwebtoken'
import { TokenModel } from '../models/token.model'

class TokenService {
	async genereteTokens(payload: any) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
			expiresIn: '30m'
		})
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
			expiresIn: '30d'
		})

		return {
			accessToken,
			refreshToken
		}
	}

	async saveToken(userId: number, refreshToken: string) {
		const existingToken = await TokenModel.findOne({ where: { userId } })

		if (existingToken) {
			existingToken.dataValues.refreshToken = refreshToken
			return existingToken.save()
		}

		const token = await TokenModel.create({ user: userId, refreshToken })
		return token
	}

	async removeToken(refreshToken: string) {
		const token = await TokenModel.destroy({ where: { refreshToken } })
		return token;
	} 
}

export default new TokenService()
