import { MODEL } from '../constants/model.constant'
import { sequelize } from '../db'
import { commentModel_instance } from './comment.model'
import { likeModel_instance } from './like.model'
import { subscriptionModel_instance } from './subscription.model'
import { tokenModel_instance } from './token.model'
import { userModel_instance } from './user.model'
import { videoModel_instance } from './video.model'

export const CommentModel = sequelize.define(MODEL.comment, commentModel_instance)
export const LikeModel = sequelize.define(MODEL.like, likeModel_instance)
export const SubscriptionModel = sequelize.define(MODEL.subscription, subscriptionModel_instance)
export const TokenModel = sequelize.define(MODEL.token, tokenModel_instance)
export const UserModel = sequelize.define(MODEL.user, userModel_instance)
export const VideoModel = sequelize.define(MODEL.video, videoModel_instance)

UserModel.hasOne(TokenModel)
TokenModel.belongsTo(UserModel)

UserModel.belongsToMany(UserModel, {
  as: 'subscriptions',
  foreignKey: 'profileId',
  otherKey: 'channelId',
  through: SubscriptionModel,
})

UserModel.hasMany(CommentModel)
CommentModel.belongsTo(UserModel)

UserModel.hasMany(LikeModel)
LikeModel.belongsTo(UserModel)

UserModel.hasMany(VideoModel)
VideoModel.belongsTo(UserModel)

VideoModel.hasMany(CommentModel)
CommentModel.belongsTo(VideoModel)

VideoModel.hasMany(LikeModel)
LikeModel.belongsTo(VideoModel)
