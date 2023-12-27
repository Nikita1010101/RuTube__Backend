import { Model } from 'sequelize'

export function convertModelToArray<T>(modelArray: Model<T>[]): T[] {
  return modelArray.map(model => model.dataValues)
}