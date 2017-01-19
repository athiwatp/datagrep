/* eslint-env jest */
import datagrep, { utils } from '../src/index'
import path from 'path'

describe('datagrep.gradientDescentSync', () => {
  const { csv, linearAlgebra } = utils

  it('performs gradient descent', async () => {
    const data = csv.parseCsvSync(path.resolve('spec/data/sample0.csv'))
    const { X, y } = linearAlgebra.splitXySync(data)
    const theta = linearAlgebra.nullMatrixSync(linearAlgebra.numColsSync(X), 1)
    const alpha = 0.01
    const iterations = 1500
    const [theta0, theta1] = datagrep.gradientDescentSync(X, y, theta, alpha, iterations)

    expect(Number.parseFloat(theta0[0])).toBe(-3.63029143940436)
    expect(Number.parseFloat(theta1[0])).toBe(1.166362350335582)
  })
})
