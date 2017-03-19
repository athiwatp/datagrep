/* eslint-env jest */
import datagrep, { utils } from '../../../../src/index'
import path from 'path'

describe('datagrep.regression.linear.normalEqn', () => {
  const { csv, linearAlgebra } = utils
  const precision = 14

  it('computes theta for sample #0', async () => {
    const data = await csv.parseCsv(path.resolve('spec/data/sample0.csv'))
    const { X, y } = await linearAlgebra.splitXy(data)
    const [theta0, theta1] = await datagrep.regression.linear.normalEqn(X, y)

    expect(parseFloat(theta0[0].toPrecision(precision))).toBe(-3.895780878312)
    expect(parseFloat(theta1[0].toPrecision(precision))).toBe(1.1930336441896)
  })

  it('computes theta for sample #1', async () => {
    const data = await csv.parseCsv(path.resolve('spec/data/sample1.csv'))
    const { X, y } = await linearAlgebra.splitXy(data)
    const [theta0, theta1, theta2] = await datagrep.regression.linear.normalEqn(X, y)

    expect(parseFloat(theta0[0].toPrecision(precision))).toBe(89597.909545021)
    expect(parseFloat(theta1[0].toPrecision(precision))).toBe(139.21067401753)
    expect(parseFloat(theta2[0].toPrecision(precision))).toBe(-8738.0191129264)
  })
})
