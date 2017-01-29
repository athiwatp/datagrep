import {
  dotSync,
  logSync,
  meanSync,
  multiplySync,
  numRowsSync,
  sigmoidSync,
  subtractSync,
  transposeSync
} from '../../../utils/linearAlgebra'

export default (X, y, theta) => {
  const m = numRowsSync(X)
  const h = sigmoidSync(dotSync(X, theta))
  const minuend = multiplySync(multiplySync(y, -1), logSync(h))
  const subtrahend = multiplySync(subtractSync(1, y), logSync(subtractSync(1, h)))
  const cost = meanSync(subtractSync(minuend, subtrahend))
  const gradient = multiplySync((1 / m), dotSync(transposeSync(subtractSync(h, y)), X))

  return {
    cost,
    gradient
  }
}
