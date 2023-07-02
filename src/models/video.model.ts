import sequelize from '../db'
import { DataTypes } from 'sequelize'

export const VideoModel = sequelize.define('video', {
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