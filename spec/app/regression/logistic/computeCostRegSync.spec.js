/* eslint-env jest */
import datagrep, { utils } from '../../../../src/index'
import path from 'path'

describe('datagrep.regression.logistic.computeCostRegSync', () => {
  const { csv, linearAlgebra } = utils

  it('computes the cost for logistic regression using regularization', () => {
    const data = csv.parseCsvSync(path.resolve('spec/data/sample3.csv'))
    const { X, y } = linearAlgebra.splitXySync(data, false)
    const { X: X1, y: X2 } = linearAlgebra.splitXySync(X, false)
    const x = datagrep.polynomialFeatureMapSync(X1, X2, 6)
    const theta = linearAlgebra.nullMatrixSync(linearAlgebra.numColsSync(x), 1)
    const lambda = 1
    const { cost, gradient } = datagrep.regression.logistic.computeCostRegSync(x, y, theta, lambda)

    expect(cost).toBe(0.6931471805599461)
    expect(parseFloat(gradient[0][0])).toBe(0.00847457627118644)
    expect(parseFloat(gradient[0][1])).toBe(0.01878809322033899)
    expect(parseFloat(gradient[0][2])).toBe(0.00007777118644068388)
    expect(parseFloat(gradient[0][25])).toBe(0.007265043164341689)
    expect(parseFloat(gradient[0][26])).toBe(0.001376461747689044)
    expect(parseFloat(gradient[0][27])).toBe(0.03879363634483876)
  })
})
