import {
  dotSync,
  logSync,
  meanSync,
  multiplySync,
  numRowsSync,
  productSync,
  sigmoidSync,
  subtractSync,
  transposeSync
} from '../../../utils/linearAlgebra'

export default (X, y, theta) => {
  const m = numRowsSync(X)
  const h = sigmoidSync(dotSync(X, theta))
  const minuend = productSync(multiplySync(y, -1), logSync(h))
  const subtrahend = productSync(subtractSync(1, y), logSync(subtractSync(1, h)))
  const cost = meanSync(subtractSync(minuend, subtrahend))[0]
  const gradient = multiplySync((1 / m), dotSync(transposeSync(subtractSync(h, y)), X))

  return {
    cost,
    gradient
  }
}
