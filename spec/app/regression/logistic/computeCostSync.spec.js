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

    expect(cost).toBe(0.6931471805599458)
    expect(parseFloat(gradient[0][0])).toBe(-0.1)
    expect(parseFloat(gradient[0][1])).toBe(-12.00921658929115)
    expect(parseFloat(gradient[0][2].toPrecision(15))).toBe(-11.26284220551360)
  })

  it('computes the cost for logistic regression without theta being a null matrix', () => {
    const data = csv.parseCsvSync(path.resolve('spec/data/sample2.csv'))
    const { X, y } = linearAlgebra.splitXySync(data)
    const theta = [[-24], [0.2], [0.2]]
    const { cost, gradient } = datagrep.regression.logistic.computeCostSync(X, y, theta)

    expect(parseFloat(cost.toPrecision(15))).toBe(0.218330193826598)
    expect(parseFloat(gradient[0][0].toPrecision(14))).toBe(0.042902994899534)
    expect(parseFloat(gradient[0][1].toPrecision(14))).toBe(2.5662341155108)
    expect(parseFloat(gradient[0][2].toPrecision(15))).toBe(2.64679737108243)
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
      expect(cost).toBe(0.2034977015894399)
      expect(parseFloat(theta[0].toPrecision(7))).toBe(-25.16133)
      expect(parseFloat(theta[1].toPrecision(8))).toBe(0.20623171)
      expect(parseFloat(theta[2].toPrecision(11))).toBe(0.2014716)
    })

    it('predicts accurately', () => {
      const predictions = predict(theta, X)
      const accuracy = 100 * predictions.reduce((previousValue, currentValue, index) => {
        if (currentValue === y[index][0]) previousValue++
        return previousValue
      }, 0) / predictions.length

      expect(parseFloat(probabilities(theta, [1, 45, 85]).toPrecision(7))).toBe(0.7762907)
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
