import { errors } from '../utils/common'
import {
    dot,
    multiply,
    numRows,
    subtract,
    transpose
} from '../utils/linearAlgebra'

/**
 * Performs Gradient Descent asynchronously.
 * @param {Array[]} X - the training set of independent data
 * @param {Array[]} y - the training set of dependent data
 * @param {Array[]} theta - the initial value of the coefficients
 * @param {Number} alpha - the step size (aka learning rate)
 * @param {Number} numIters - the number of iterations to perform
 * @param {Function} [param=function() {}] callback - the callback to invoke upon completion
 * @returns {Promise<Array[], Error>} resolves to theta - the calculated coefficients
 */
export default (X, y, theta, alpha, numIters, callback = () => {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const k = alpha / await numRows(y)
      const transposeX = await transpose(X)

      for (let iter = 0; iter < numIters; iter++) {
        const delta = await multiply(k, await dot(transposeX, await errors(X, theta, y)))

        theta = await subtract(theta, delta)
      }
    } catch (error) {
      const _error = new Error(error)
      callback(_error)
      return reject(_error)
    }

    callback(theta)
    resolve(theta)
  })
}
