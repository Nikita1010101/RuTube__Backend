import { DataTypes } from 'sequelize'

export const commentModel_instance = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	content: { type: DataTypes.STRING(4095) }
}