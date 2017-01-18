import { errors } from '../utils/common'
import {
    dot,
    multiply,
    numRows,
    subtract,
    transpose
} from '../utils/linearAlgebra'

export default (X, y, theta, alpha, numIters) => {
  const k = alpha / numRows(y)
  const transposeX = transpose(X)

  for (let iter = 0; iter < numIters; iter++) {
    const delta = multiply(k, dot(transposeX, errors(X, theta, y)))

    theta = subtract(theta, delta)
  }

  return theta
}
