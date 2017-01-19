/* eslint-env jest */
import datagrep, { utils } from '../src/index'
import path from 'path'

describe('datagrep.computeCost', () => {
  const { csv, linearAlgebra } = utils

  it('computes the cost', () => {
    const data = csv.parseCsvSync(path.resolve('spec/data/sample0.csv'))
    const { X, y } = linearAlgebra.splitXySync(data)
    const theta = linearAlgebra.nullMatrixSync(linearAlgebra.numColsSync(X), 1)
    const cost = datagrep.computeCostSync(X, y, theta)

    expect(Number.parseFloat(cost)).toBe(32.072733877455676)
  })
})
