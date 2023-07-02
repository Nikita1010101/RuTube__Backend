import sequelize from '../db'
import { DataTypes } from 'sequelize'

export const LikeModel = sequelize.define('likes', {
	userId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
	videoId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false }
})