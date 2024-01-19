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
  videoUrl: { type: DataTypes.STRING, unique: true, defaultValue: '' },
  previewUrl: { type: DataTypes.STRING, defaultValue: 'http://localhost:4200/uploads/previews/video-mock.png' },
  views: { type: DataTypes.INTEGER, defaultValue: 0 },
  duration: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  public: { type: DataTypes.BOOLEAN, defaultValue: false }
}
