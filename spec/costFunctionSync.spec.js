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

  it('computes the cost for logistic regression without theta being a null matrix', () => {
    const data = csv.parseCsvSync(path.resolve('spec/data/sample2.csv'))
    const { X, y } = linearAlgebra.splitXySync(data)
    const theta = [[-24], [0.2], [0.2]]
    const { cost, gradient } = datagrep.costFunctionSync(X, y, theta)

    expect(Number.parseFloat(cost)).toBe(0.21833019382659782)
    expect(Number.parseFloat(gradient[0][0])).toBe(0.04290299489953449)
    expect(Number.parseFloat(gradient[0][1])).toBe(2.566234115510758)
    expect(Number.parseFloat(gradient[0][2])).toBe(2.6467973710824326)
  })
})
