import { Model } from 'sequelize'

import { UserModel, VideoModel } from '../../models/index.model'
import { TUser } from '../../types/user.types'

class UserService_class {
  public async getAll(id: number[] = []) {
    const users = await UserModel.findAll<Model<TUser>>({ where: { id } })

    return users
  }

  public async getOne(userId: number) {
    const user = await UserModel.findOne<Model<TUser>>({
      where: { id: userId },
      include: {
        model: VideoModel,
      },
    })

    return user
  }
}

export const UserService = new UserService_class()
