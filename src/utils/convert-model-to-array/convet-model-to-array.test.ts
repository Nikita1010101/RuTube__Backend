import { test, expect } from '@jest/globals'
import { convertModelToArray } from './convert-model-to-array'
import { Model } from 'sequelize'

test('', async () => {
  interface IData {
    data: string
  }

  const testingData = [
    { dataValues: { data: 'data 1' } },
    { dataValues: { data: 'data 2' } },
    { dataValues: { data: 'data 3' } },
  ] as Model<IData>[]

  const resultData = [{ data: 'data 1' }, { data: 'data 2' }, { data: 'data 3' }] as IData[]

  expect(convertModelToArray(testingData)).toEqual(resultData)
})
