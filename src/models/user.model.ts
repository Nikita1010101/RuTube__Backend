import { DataTypes } from 'sequelize'

export const userModel_instance = {
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
	avatarPath: { type: DataTypes.STRING, defaultValue: '' },
	isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
	activationLink: { type: DataTypes.STRING }
}
