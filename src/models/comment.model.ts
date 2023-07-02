import sequelize from '../db'
import { DataTypes } from 'sequelize'

export const CommentModel = sequelize.define('comment', {
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