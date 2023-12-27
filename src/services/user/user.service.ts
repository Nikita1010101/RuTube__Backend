import { Model } from 'sequelize'

import { UserModel } from '../../models/index.model'
import { IUser } from '../../types/user.types'
import { convertModelToArray } from '../../utils/convert-model-to-array/convert-model-to-array'
import { VideoHelperService } from '../video/video.helper.service'

class UserService_class {
  public async getAll(id: number[] = []) {
    const users = await UserModel.findAll<Model<IUser>>({ where: { id } })
    return users
  }

  public async getOne(id: number) {
    const user = await UserModel.findOne<Model<IUser>>({ where: { id } })
    const videos = await VideoHelperService.getAllById(Number(user.dataValues.id))
    user.dataValues.videos = convertModelToArray(videos)
    return user
  }

  public async create(body: IUser | IUser[]) {
    if (Array.isArray(body)) {
      for (let i = 0; i < body.length; i++) {
        await UserModel.create<Model<IUser>>(body[i])
      }
    } else {
      await UserModel.create<Model<IUser>>(body)
    }
    return true
  }
}

export const UserService = new UserService_class()
