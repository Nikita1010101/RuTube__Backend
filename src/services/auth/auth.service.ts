import bcrypt from 'bcrypt'
import { v4 } from 'uuid'

import { UserDto } from '../../dtos/user.dto'
import { ApiError } from '../../exceptions/api.error'
import { UserModel } from '../../models/index.model'
import { TokenService } from '../token/token.service'
import { EmailService } from '../email/email.service'
import { IUser } from '../../types/user.types'
import { AUTH_ERROR } from '../../constants/errors.constant'

class AuthService_class {
  private async convertData(user: unknown) {
    const userDto = new UserDto(user)
    const tokens = await TokenService.genereteTokens({ ...userDto })
    await TokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }

  public async registration(email: string, password: string, name: string) {
    const isAccaunt = await UserModel.findOne({ where: { email } })

    if (isAccaunt) {
      throw ApiError.BadRequest(AUTH_ERROR.emailNotExist(email))
    }

    const hashPassword = await bcrypt.hash(password, 5)
    const activationLink = v4()

    const user = await UserModel.create({
      email,
      password: hashPassword,
      name,
      activationLink,
    })
    await EmailService.sendActiovationMail(
      email,
      `${process.env.APP_API}/api/user/activate/${activationLink}`
    )

    return await this.convertData(user)
  }

  public async login(email: string, password: string) {
    const user = await UserModel.findOne({
      where: { email },
    })

    if (!user) {
      throw ApiError.BadRequest(AUTH_ERROR.userNotFound)
    }

    const isPasswordEquals = await bcrypt.compare(password, user.dataValues.password)

    if (!isPasswordEquals) {
      throw ApiError.BadRequest(AUTH_ERROR.notCorrectPassword)
    }

    return await this.convertData(user)
  }

  public async logout(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken)
    return token
  }

  public async activate(activationLink: string) {
    const user = await UserModel.findOne({ where: { activationLink } })

    if (!user) {
      throw ApiError.BadRequest(AUTH_ERROR.notCorrectLink)
    }

    await user.update({ isActivated: true })
  }

  public async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }

    const tokenData = TokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await TokenService.findToken(refreshToken)

    if (!tokenData || !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }

    const user = await UserModel.findOne({
      where: { id: tokenFromDb.dataValues.userId },
    })

    return await this.convertData(user)
  }

  public async edit({ id, ...data }: IUser) {
    const user = await UserModel.findOne({ where: { id } })
    await user.update({ data })
    return true
  }
}

export const AuthService = new AuthService_class()
