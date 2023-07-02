import sequelize from '../db'
import { DataTypes } from 'sequelize'

export const SubscriptionModel = sequelize.define('subscriptions', {
	userId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
	channelId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false }
})