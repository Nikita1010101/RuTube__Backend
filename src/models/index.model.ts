import { MODEL } from '../constants/model.constant'
import { sequelize } from '../db'
import { commentModel_instance } from "./comment.model"
import { likeModel_instance } from "./like.model"
import { subscriptionModel_instance } from "./subscription.model"
import { tokenModel_instance } from "./token.model"
import { userModel_instance } from "./user.model"
import { videoModel_instance } from "./video.model"

export const CommentModel = sequelize.define(MODEL.COMMENT, commentModel_instance)
export const LikeModel = sequelize.define(MODEL.LIKE, likeModel_instance)
export const SubscriptionModel = sequelize.define(MODEL.SUBSCRIPTION, subscriptionModel_instance)
export const TokenModel = sequelize.define(MODEL.TOKEN, tokenModel_instance)
export const UserModel = sequelize.define(MODEL.USER, userModel_instance)
export const VideoModel = sequelize.define(MODEL.VIDEO, videoModel_instance)

UserModel.hasOne(TokenModel)
TokenModel.belongsTo(UserModel)

UserModel.hasMany(VideoModel, { as: 'videos' })
VideoModel.belongsTo(UserModel)

UserModel.hasMany(SubscriptionModel, { as: 'subscriptions' })
SubscriptionModel.belongsTo(UserModel)

UserModel.hasMany(LikeModel, { as: 'likes' })
LikeModel.belongsTo(UserModel)

VideoModel.hasMany(CommentModel, { as: 'comments' })
CommentModel.belongsTo(VideoModel)
