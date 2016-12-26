/* eslint-env jest */
import datagrep, { utils } from '../src/index'
import path from 'path'

describe('datagrep.gradientDescent', () => {
  const { csv, linearAlgebra } = utils

  it('performs gradient descent', async () => {
    const data = await csv.parseCsv(path.resolve('spec/data/sample0.csv'))
    const { X, y } = linearAlgebra.splitXy(data)
    const theta = linearAlgebra.nullMatrix(linearAlgebra.numCols(X), 1)
    const alpha = 0.01
    const iterations = 1500
    const [theta0, theta1] = datagrep.gradientDescent(X, y, theta, alpha, iterations)

    expect(Number.parseFloat(theta0[0].toFixed(7))).toBe(-3.6302914)
    expect(Number.parseFloat(theta1[0].toFixed(7))).toBe(1.1663624)
  })
})
