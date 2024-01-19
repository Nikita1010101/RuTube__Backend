import { Model } from 'sequelize'

export function convertModelsToValuesArray<T>(models: Model<T>[], key: keyof T) {
  return models.map(model => model.dataValues[key])
}
