/* eslint-env jest */
import datagrep, { utils } from '../../../../src/index'
import path from 'path'

describe('datagrep.regression.linear.computeCost', () => {
  const { csv, linearAlgebra } = utils

  it('computes the cost', async () => {
    const data = await csv.parseCsv(path.resolve('spec/data/sample0.csv'))
    const { X, y } = await linearAlgebra.splitXy(data)
    const theta = await linearAlgebra.nullMatrix(await linearAlgebra.numCols(X), 1)
    const cost = await datagrep.regression.linear.computeCost(X, y, theta)

    expect(Number.parseFloat(cost.toPrecision(15))).toBe(32.0727338774557)
  })
})
