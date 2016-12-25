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
    expect(Number.parseFloat(mu[0].toFixed(5))).toBe(2000.68085)
    expect(Number.parseFloat(mu[1].toFixed(5))).toBe(3.17021)
    expect(Number.parseFloat(sigma[0].toFixed(5))).toBe(794.70235)
    expect(Number.parseFloat(sigma[1].toFixed(5))).toBe(0.76098)
  })
})
