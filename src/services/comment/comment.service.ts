import { Model } from 'sequelize'

import { CommentModel } from '../../models/index.model'
import { IComment } from '../../types/comment.types'
import { ApiError } from '../../exceptions/api.error'
import { COMMENT_ERROR, TOTAL_ERROR } from '../../constants/errors.constant'

class CommentService_class {
  public async getAllById(id: number) {
    if (!id) {
      throw ApiError.BadRequest(TOTAL_ERROR.notCorrectId)
    } 

    const comments = await CommentModel.findAll<Model<IComment>>({ where: { videoId: id } })
    return comments
  }

  public async add(body: IComment) {
    if (!body) {
      throw ApiError.BadRequest(COMMENT_ERROR.notCorrectBody)
    } 

    await CommentModel.create<Model<IComment>>(body)
    return true
  }

  public async remove(id: number) {
    if (!id) {
      throw ApiError.BadRequest(TOTAL_ERROR.notCorrectId)
    } 

    await CommentModel.destroy({ where: { id } })
    return true
  }
}

export const CommentService = new CommentService_class()
