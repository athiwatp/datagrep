/* eslint-env jest */
import datagrep, { utils } from '../src/index'
import path from 'path'

describe('datagrep.featureNormalize', () => {
  const { csv, linearAlgebra } = utils

  it('normalizes the feature matrix', async () => {
    const data = await csv.parseCsv(path.resolve('spec/data/sample1.csv'))
    const { X } = linearAlgebra.splitXy(data, false)
    const [normX, mu, sigma] = datagrep.featureNormalize(X)

    expect(normX.length).toBe(X.length)
    expect(Number.parseFloat(mu[0].toFixed(7))).toBe(2000.6808511)
    expect(Number.parseFloat(mu[1].toFixed(7))).toBe(3.1702128)
    expect(Number.parseFloat(sigma[0].toFixed(7))).toBe(794.7023535)
    expect(Number.parseFloat(sigma[1].toFixed(7))).toBe(0.7609819)
  })
})
