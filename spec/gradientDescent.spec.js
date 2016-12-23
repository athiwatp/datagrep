/* eslint-env jasmine */
import datagrep, { utils } from '../src/index'
import text from './ex1data1.txt'

describe('datagrep.gradientDescent', () => {
  const { csv, linearAlgebra } = utils

  it('performs gradient descent', async (done) => {
    const data = await csv.parseCsv(text)
    const { X, y } = linearAlgebra.splitXy(data)
    const theta = linearAlgebra.nullMatrix(linearAlgebra.numCols(X), 1)
    const alpha = 0.01
    const iterations = 1500
    const [theta0, theta1] = datagrep.gradientDescent(X, y, theta, alpha, iterations)

    expect(Number.parseFloat(theta0[0].toFixed(6))).toBe(-3.630291)
    expect(Number.parseFloat(theta1[0].toFixed(6))).toBe(1.166362)
    done()
  })
})
