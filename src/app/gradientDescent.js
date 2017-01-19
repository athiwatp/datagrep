import { errors } from '../utils/common'
import {
    dot,
    multiply,
    numRows,
    subtract,
    transpose
} from '../utils/linearAlgebra'

export default (X, y, theta, alpha, numIters, callback = () => {}) => {
  return new Promise(async (resolve, reject) => {
    const k = alpha / await numRows(y)
    const transposeX = await transpose(X)

    for (let iter = 0; iter < numIters; iter++) {
      const delta = await multiply(k, await dot(transposeX, await errors(X, theta, y)))

      theta = await subtract(theta, delta)
    }

    callback(theta)
    resolve(theta)
  })
}
