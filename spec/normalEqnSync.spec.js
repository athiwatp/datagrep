/* eslint-env jest */
import datagrep, { utils } from '../src/index'
import path from 'path'

const parseFloat = Number.parseFloat

describe('datagrep.normalEqnSync', () => {
  const { csv, linearAlgebra } = utils

  it('computes theta for sample #0', () => {
    const data = csv.parseCsvSync(path.resolve('spec/data/sample0.csv'))
    const { X, y } = linearAlgebra.splitXySync(data)
    const [theta0, theta1] = datagrep.normalEqnSync(X, y)

    expect(parseFloat(theta0[0])).toBe(-3.8957808783117756)
    expect(parseFloat(theta1[0])).toBe(1.1930336441895864)
  })

  it('computes theta for sample #1', () => {
    const data = csv.parseCsvSync(path.resolve('spec/data/sample1.csv'))
    const { X, y } = linearAlgebra.splitXySync(data)
    const [theta0, theta1, theta2] = datagrep.normalEqnSync(X, y)

    expect(parseFloat(theta0[0])).toBe(89597.90954502113)
    expect(parseFloat(theta1[0])).toBe(139.2106740175284)
    expect(parseFloat(theta2[0])).toBe(-8738.019112926442)
  })
})
