import { DataTypes } from 'sequelize'

export const likeModel_instance = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	userId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
	videoId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false }
}