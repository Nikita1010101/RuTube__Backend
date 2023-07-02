import sequelize from '../db'
import { DataTypes } from 'sequelize'

export const TokenModel = sequelize.define('token', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	refreshToken: { type: DataTypes.STRING }
})