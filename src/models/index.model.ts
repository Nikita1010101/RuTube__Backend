import { CommentModel } from "./comment.model"
import { LikeModel } from "./like.model"
import { SubscriptionModel } from "./subscription.model"
import { TokenModel } from "./token.model"
import { UserModel } from "./user.model"
import { VideoModel } from "./video.model"

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
