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
    const _errors = errors(X, theta, y)
    const _dot = dot(transposeX, _errors)
    const _multiply = multiply(_dot, k)

    theta = subtract(theta, _multiply)
  }

  return theta
}
