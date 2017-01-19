import { errorsSync } from '../utils/common'
import {
    dotSync,
    multiplySync,
    numRowsSync,
    subtractSync,
    transposeSync
} from '../utils/linearAlgebra'

/**
 * Performs Gradient Descent synchronously.
 * @param {Array[]} X - the training set of independent data
 * @param {Array[]} y - the training set of dependent data
 * @param {Array[]} theta - the initial value of the coefficients
 * @param {Number} alpha - the step size (aka learning rate)
 * @param {Number} numIters - the number of iterations to perform
 * @returns {Array[]} theta - the calculated coefficients
 */
export default (X, y, theta, alpha, numIters) => {
  const k = alpha / numRowsSync(y)
  const transposeX = transposeSync(X)

  for (let iter = 0; iter < numIters; iter++) {
    const delta = multiplySync(k, dotSync(transposeX, errorsSync(X, theta, y)))

    theta = subtractSync(theta, delta)
  }

  return theta
}
