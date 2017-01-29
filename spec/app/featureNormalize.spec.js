/* eslint-env jest */
import datagrep, { utils } from '../../src/index'
import path from 'path'

describe('datagrep.featureNormalize', () => {
  const { csv, linearAlgebra } = utils

  it('normalizes the feature matrix', async () => {
    const data = await csv.parseCsv(path.resolve('spec/data/sample1.csv'))
    const { X } = await linearAlgebra.splitXy(data, false)
    const [normX, mu, sigma] = await datagrep.featureNormalize(X)

    expect(normX.length).toBe(X.length)
    expect(Number.parseFloat(mu[0])).toBe(2000.6808510638298)
    expect(Number.parseFloat(mu[1])).toBe(3.1702127659574466)
    expect(Number.parseFloat(sigma[0])).toBe(794.7023535338894)
    expect(Number.parseFloat(sigma[1])).toBe(0.7609818867801011)
  })
})
