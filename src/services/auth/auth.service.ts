import { Model } from 'sequelize'
import bcrypt from 'bcrypt'
import { v4 as createUniqueId } from 'uuid'

import { UserDto } from '../../dtos/user.dto'
import { ApiError } from '../../exceptions/api.error'
import { UserModel } from '../../models/index.model'
import { TokenService } from '../token/token.service'
import { EmailService } from '../email/email.service'
import { AUTH_ERROR } from '../../constants/errors.constant'
import { TEditBody } from '../../types/auth.types'
import { CommentService } from '../comment/comment.service'
import { LikeService } from '../like/like.service'
import { SubscriptionService } from '../subscription/subscription.service'
import { VideoService } from '../video/video.service'
import { TUser } from '../../types/user.types'

class AuthService_class {
  public async activate(activationId: string) {
    const user = await UserModel.findOne<Model<TUser>>({ where: { activationId } })

    if (!user) throw ApiError.BadRequest(AUTH_ERROR.notCorrectLink)

    await user.update({ isActivated: true })
  }

  private async convertData(user: TUser) {
    const userDto = new UserDto(user)
    const tokens = await TokenService.generate({ ...userDto })
    await TokenService.save(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }

  public async edit(userId: number, body: TEditBody) {
    const user = await UserModel.findOne<Model<TUser>>({ where: { id: userId } })

    await user.update(body)
    
    return true
  }

  public async logout(refreshToken: string) {
    if (!refreshToken) throw ApiError.UnauthorizedError()

    await TokenService.remove(refreshToken)

    return true
  }

  public async login(email: string, password: string) {
    const user = await UserModel.findOne<Model<TUser>>({
      where: { email, isActivated: true },
    })

    if (!user) throw ApiError.BadRequest(AUTH_ERROR.userNotFound)

    const isPasswordEquals = await bcrypt.compare(password, user.dataValues.password)

    if (!isPasswordEquals) throw ApiError.BadRequest(AUTH_ERROR.notCorrectPassword)

    return await this.convertData(user.dataValues)
  }

  public async refresh(refreshToken: string) {
    if (!refreshToken) throw ApiError.UnauthorizedError()

    const tokenData = TokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await TokenService.find(refreshToken)

    if (!tokenData || !tokenFromDb) throw ApiError.UnauthorizedError()

    const user = await UserModel.findOne<Model<TUser>>({
      where: { id: tokenFromDb.dataValues.userId },
    })

    return await this.convertData(user.dataValues)
  }

  public async registration(email: string, password: string, name: string) {
    const account = await UserModel.findOne<Model<TUser>>({ where: { email } })

    if (account) throw ApiError.BadRequest(AUTH_ERROR.emailNotExist(email))

    const activationId = createUniqueId()
    const activationUrl = `${process.env.API_URL}/api/auth/activate/${activationId}`

    const user = await UserModel.create<Model<TUser>>({ email, password, name, activationId })

    await EmailService.sendActivationMail(email, activationUrl)

    return await this.convertData(user.dataValues)
  }

  public async remove(refreshToken: string) {
    if (!refreshToken) {
      console.log('this is error')
      throw ApiError.UnauthorizedError()
    }

    const tokenData = TokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await TokenService.find(refreshToken)

    if (!tokenData || !tokenFromDb) throw ApiError.UnauthorizedError()

    const user = await UserModel.findOne<Model<TUser>>({
      where: { id: tokenFromDb.dataValues.userId },
    })

    const userId = user.dataValues.id

    await CommentService.removeAll(userId)
    await LikeService.removeAll(userId)
    await SubscriptionService.removeAll(userId)
    await TokenService.remove(refreshToken)
    await VideoService.removeAll(userId)
    await user.destroy()

    return true
  }
}

export const AuthService = new AuthService_class()
