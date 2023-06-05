import sequelize from '../db'
import { DataTypes } from 'sequelize'

const User = sequelize.define('user', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	email: { type: DataTypes.STRING, unique: true, allowNull: false },
	password: { type: DataTypes.STRING, allowNull: false },
	name: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING, defaultValue: '' },
	avatarPath: { type: DataTypes.STRING, defaultValue: '' }
})

const Video = sequelize.define('video', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	title: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING, allowNull: false },
	videoPath: { type: DataTypes.STRING, unique: true },
	previewPath: { type: DataTypes.STRING },
	views: { type: DataTypes.INTEGER, defaultValue: 0 },
	duration: { type: DataTypes.INTEGER, allowNull: false }
})

const Comment = sequelize.define('comment', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	avatarPath: { type: DataTypes.STRING },
	userName: { type: DataTypes.STRING },
	content: { type: DataTypes.STRING }
})

const Subscription = sequelize.define('subscriptions', {
	userId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
	channelId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false }
})

const Likes = sequelize.define('likes', {
	userId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
	videoId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false }
})

User.hasMany(Video, { as: 'videos' })
Video.belongsTo(User)

User.hasMany(Subscription, { as: 'subscriptions' })
Subscription.belongsTo(User)

User.hasMany(Likes, { as: 'likes' })
Likes.belongsTo(User)

Video.hasMany(Comment, { as: 'comments' })
Comment.belongsTo(Video)

export { User, Video, Subscription, Likes, Comment }
