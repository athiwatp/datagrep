/* eslint-env jest */
import datagrep, { utils } from '../../../../src/index'
import path from 'path'

describe('datagrep.regression.logistic.computeCostSync', () => {
  const { csv, linearAlgebra } = utils

  it('computes the cost for logistic regression', () => {
    const data = csv.parseCsvSync(path.resolve('spec/data/sample2.csv'))
    const { X, y } = linearAlgebra.splitXySync(data)
    const theta = linearAlgebra.nullMatrixSync(linearAlgebra.numColsSync(X), 1)
    const { cost, gradient } = datagrep.regression.logistic.computeCostSync(X, y, theta)

    expect(Number.parseFloat(cost)).toBe(0.6931471805599458)
    expect(Number.parseFloat(gradient[0][0])).toBe(-0.1)
    expect(Number.parseFloat(gradient[0][1])).toBe(-12.009216589291153)
    expect(Number.parseFloat(gradient[0][2])).toBe(-11.262842205513596)
  })

  it('computes the cost for logistic regression without theta being a null matrix', () => {
    const data = csv.parseCsvSync(path.resolve('spec/data/sample2.csv'))
    const { X, y } = linearAlgebra.splitXySync(data)
    const theta = [[-24], [0.2], [0.2]]
    const { cost, gradient } = datagrep.regression.logistic.computeCostSync(X, y, theta)

    expect(Number.parseFloat(cost)).toBe(0.21833019382659782)
    expect(Number.parseFloat(gradient[0][0])).toBe(0.04290299489953449)
    expect(Number.parseFloat(gradient[0][1])).toBe(2.566234115510758)
    expect(Number.parseFloat(gradient[0][2])).toBe(2.6467973710824326)
  })

  describe('fminuncSync', () => {
    const data = csv.parseCsvSync(path.resolve('spec/data/sample2.csv'))
    const { X, y } = linearAlgebra.splitXySync(data)
    const thetaInitial = linearAlgebra.nullMatrixSync(linearAlgebra.numColsSync(X), 1)
    const f = datagrep.regression.logistic.computeCostSync.bind(null, X, y)
    const { cost, theta } = linearAlgebra.fminuncSync(f, thetaInitial, {
      maxit: 400
    })

    it('minimizes the provided function with respect to theta', () => {
      expect(Number.parseFloat(cost)).toBe(0.20349770158943994)
      expect(Number.parseFloat(theta[0])).toBe(-25.16133321257665)
      expect(Number.parseFloat(theta[1])).toBe(0.20623171115054015)
      expect(Number.parseFloat(theta[2])).toBe(0.20147159699663497)
    })

    it('predicts accurately', () => {
      const predictions = predict(theta, X)
      const accuracy = 100 * predictions.reduce((previousValue, currentValue, index) => {
        if (currentValue === y[index][0]) previousValue++
        return previousValue
      }, 0) / predictions.length

      expect(probabilities(theta, [1, 45, 85])[0]).toBe(0.7762906846558513)
      expect(accuracy).toBe(89)

      function probabilities (theta, X) {
        return linearAlgebra.sigmoidSync(linearAlgebra.dotSync(X, theta))
      }

      function predict (theta, X) {
        return probabilities(theta, X).map((value) => {
          return value >= 0.5 ? 1 : 0
        })
      }
    })
  })
})