import jwt from 'jsonwebtoken'

import { TokenModel } from '../../models/index.model'

class TokenService_class {
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

	validateAccessToken(token: string) {
		try {
			const accessToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY)
			return accessToken
		} catch (error) {
			return null
		}
	}

	validateRefreshToken(token: string) {
		try {
			const refreshToken = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY)
			return refreshToken
		} catch (error) {
			return null
		}
	}

	async saveToken(userId: number, refreshToken: string) {
		const tokenData = await TokenModel.findOne({ where: { userId } })

		if (tokenData) {
			return await tokenData.update({ refreshToken })
		}

		const token = await TokenModel.create({ userId, refreshToken })
		return token
	}

	async removeToken(refreshToken: string) {
		const token = await TokenModel.destroy({ where: { refreshToken } })
		return token
	}

	async findToken(refreshToken: string) {
		const tokenData = await TokenModel.findOne({ where: { refreshToken } })
		return tokenData
	}
}

export const TokenService = new TokenService_class()
