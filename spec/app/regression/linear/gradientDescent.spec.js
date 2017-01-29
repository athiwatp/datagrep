/* eslint-env jest */
import datagrep, { utils } from '../../../../src/index'
import path from 'path'

const parseFloat = Number.parseFloat

describe('datagrep.regression.linear.gradientDescent', () => {
  const { csv, linearAlgebra } = utils

  it('performs gradient descent', async () => {
    const data = await csv.parseCsv(path.resolve('spec/data/sample0.csv'))
    const { X, y } = await linearAlgebra.splitXy(data)
    const theta = await linearAlgebra.nullMatrix(await linearAlgebra.numCols(X), 1)
    const alpha = 0.01
    const iterations = 1500
    const [theta0, theta1] = await datagrep.regression.linear.gradientDescent(X, y, theta, alpha, iterations)

    expect(parseFloat(theta0[0])).toBe(-3.63029143940436)
    expect(parseFloat(theta1[0])).toBe(1.166362350335582)
  })

  it('invokes the callback with the results if provided', async () => {
    const data = await csv.parseCsv(path.resolve('spec/data/sample0.csv'))
    const { X, y } = await linearAlgebra.splitXy(data)
    const theta = await linearAlgebra.nullMatrix(await linearAlgebra.numCols(X), 1)
    const alpha = 0.01
    const iterations = 1500
    const callback = jest.fn()
    await datagrep.regression.linear.gradientDescent(X, y, theta, alpha, iterations, callback)

    expect(callback.mock.calls.length).toBe(1)
    expect(parseFloat(callback.mock.calls[0][0][0])).toBe(-3.63029143940436)
    expect(parseFloat(callback.mock.calls[0][0][1])).toBe(1.166362350335582)
  })
})
