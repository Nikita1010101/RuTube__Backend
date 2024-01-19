import { Model } from 'sequelize'

import { CommentModel } from '../../models/index.model'
import { TComment } from '../../types/comment.types'
import { ApiError } from '../../exceptions/api.error'
import { COMMENT_ERROR, TOTAL_ERROR } from '../../constants/errors.constant'

class CommentService_class {
  public async add(body: TComment) {
    if (!body) throw ApiError.BadRequest(COMMENT_ERROR.notCorrectBody)

    await CommentModel.create<Model<TComment>>(body)

    return true
  }

  public async edit(commentId: number, content: string) {
    const comment = await CommentModel.findOne<Model<TComment>>({ where: { id: commentId } })

    if (!comment) throw ApiError.BadRequest(COMMENT_ERROR.commentNotFound)

    await comment.update({ content })

    return true
  }

  public async getAll(videoId: number) {
    if (!videoId) throw ApiError.BadRequest(TOTAL_ERROR.notCorrectId)

    const comments = await CommentModel.findAll<Model<TComment>>({
      where: { videoId },
      order: [['updatedAt', 'DESC']],
    })

    return comments
  }

  public async remove(commentId: number) {
    if (!commentId) throw ApiError.BadRequest(TOTAL_ERROR.notCorrectId)

    await CommentModel.destroy({ where: { id: commentId } })

    return true
  }

  public async removeAll(profileId: number) {
    await CommentModel.destroy<Model<TComment>>({ where: { userId: profileId } })

    return true
  }
}

export const CommentService = new CommentService_class()
