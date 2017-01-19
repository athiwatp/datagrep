import { errorsSync } from '../utils/common'
import {
    dotSync,
    multiplySync,
    numRowsSync,
    subtractSync,
    transposeSync
} from '../utils/linearAlgebra'

export default (X, y, theta, alpha, numIters) => {
  const k = alpha / numRowsSync(y)
  const transposeX = transposeSync(X)

  for (let iter = 0; iter < numIters; iter++) {
    const delta = multiplySync(k, dotSync(transposeX, errorsSync(X, theta, y)))

    theta = subtractSync(theta, delta)
  }

  return theta
}
