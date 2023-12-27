import { DataTypes } from 'sequelize'

export const commentModel_instance = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	avatarPath: { type: DataTypes.STRING },
	userName: { type: DataTypes.STRING },
	content: { type: DataTypes.STRING }
}