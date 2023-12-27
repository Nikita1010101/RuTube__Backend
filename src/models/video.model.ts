import { DataTypes } from 'sequelize'

export const videoModel_instance = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
  description: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
  videoPath: { type: DataTypes.STRING, unique: true, defaultValue: '' },
  previewPath: { type: DataTypes.STRING, defaultValue: '' },
  views: { type: DataTypes.INTEGER, defaultValue: 0 },
  duration: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
}
