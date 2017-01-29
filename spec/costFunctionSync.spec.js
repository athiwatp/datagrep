/* eslint-env jest */
import datagrep, { utils } from '../src/index'
import path from 'path'

describe('datagrep.costFunctionSync', () => {
  const { csv, linearAlgebra } = utils

  it('computes the cost for logistic regression', () => {
    const data = csv.parseCsvSync(path.resolve('spec/data/sample2.csv'))
    const { X, y } = linearAlgebra.splitXySync(data)
    const theta = linearAlgebra.nullMatrixSync(linearAlgebra.numColsSync(X), 1)
    const { cost, gradient } = datagrep.costFunctionSync(X, y, theta)

    expect(Number.parseFloat(cost)).toBe(0.6931471805599458)
    expect(Number.parseFloat(gradient[0][0])).toBe(-0.1)
    expect(Number.parseFloat(gradient[0][1])).toBe(-12.009216589291153)
    expect(Number.parseFloat(gradient[0][2])).toBe(-11.262842205513596)
  })
})
