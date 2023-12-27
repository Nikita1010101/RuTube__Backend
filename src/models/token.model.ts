import { DataTypes } from 'sequelize'

export const tokenModel_instance = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	refreshToken: { type: DataTypes.STRING }
}