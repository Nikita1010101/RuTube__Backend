import jwt from 'jsonwebtoken'

import { TokenModel } from '../../models/index.model'

class TokenService_class {
  async generate(payload: Object) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
      expiresIn: '10m',
    })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
      expiresIn: '10d',
    })

    return { accessToken, refreshToken }
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

  async save(userId: number, refreshToken: string) {
    const tokenData = await TokenModel.findOne({ where: { userId } })

    if (tokenData) {
      const token = await tokenData.update({ refreshToken })

      return token
    }

    const token = await TokenModel.create({ userId, refreshToken })

    return token
  }

  async remove(refreshToken: string) {
    await TokenModel.destroy({ where: { refreshToken } })

    return true
  }

  async find(refreshToken: string) {
    const tokenData = await TokenModel.findOne({ where: { refreshToken } })
    
    return tokenData
  }
}

export const TokenService = new TokenService_class()
