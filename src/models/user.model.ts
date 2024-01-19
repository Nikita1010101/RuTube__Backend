import bcrypt from 'bcrypt'
import { DataTypes } from 'sequelize'

export const userModel_instance = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(password: string) {
      const hashPassword = bcrypt.hashSync(password, 2)

      this.setDataValue('password', hashPassword)
    },
  },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, defaultValue: '' },
  avatarUrl: { type: DataTypes.STRING, defaultValue: '' },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationId: { type: DataTypes.STRING },
}
