/* eslint-env jest */
import datagrep, { utils } from '../src/index'
import path from 'path'

describe('datagrep.computeCost', () => {
  const { csv, linearAlgebra } = utils

  it('computes the cost', async () => {
    const data = await csv.parseCsv(path.resolve('spec/ex1data1.csv'))
    const { X, y } = linearAlgebra.splitXy(data)
    const theta = linearAlgebra.nullMatrix(linearAlgebra.numCols(X), 1)
    const cost = datagrep.computeCost(X, y, theta)

    expect(Number.parseFloat(cost.toFixed(4))).toBe(32.0727)
  })
})
