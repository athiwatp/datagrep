/* eslint-env jest */
import datagrep, { utils } from '../../../../src/index'
import path from 'path'

describe('datagrep.regression.linear.computeCostSync', () => {
  const { csv, linearAlgebra } = utils

  it('computes the cost', () => {
    const data = csv.parseCsvSync(path.resolve('spec/data/sample0.csv'))
    const { X, y } = linearAlgebra.splitXySync(data)
    const theta = linearAlgebra.nullMatrixSync(linearAlgebra.numColsSync(X), 1)
    const cost = datagrep.regression.linear.computeCostSync(X, y, theta)

    expect(Number.parseFloat(cost.toPrecision(15))).toBe(32.0727338774557)
  })
})
