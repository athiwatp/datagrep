/* eslint-env jest */
import datagrep, { utils } from '../src/index'
import path from 'path'

describe('datagrep.normalEqn', () => {
  const { csv, linearAlgebra } = utils

  it('computes theta for sample #0', async () => {
    const data = await csv.parseCsv(path.resolve('spec/data/sample0.csv'))
    const { X, y } = linearAlgebra.splitXy(data)
    const [theta0, theta1] = datagrep.normalEqn(X, y)

    expect(Number.parseFloat(theta0[0])).toBe(-3.8957808783117756)
    expect(Number.parseFloat(theta1[0])).toBe(1.1930336441895864)
  })

  it('computes theta for sample #1', async () => {
    const data = await csv.parseCsv(path.resolve('spec/data/sample1.csv'))
    const { X, y } = linearAlgebra.splitXy(data)
    const [theta0, theta1, theta2] = datagrep.normalEqn(X, y)

    expect(Number.parseFloat(theta0[0])).toBe(89597.90954502113)
    expect(Number.parseFloat(theta1[0])).toBe(139.2106740175284)
    expect(Number.parseFloat(theta2[0])).toBe(-8738.019112926442)
  })
})
