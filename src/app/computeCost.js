import { errors } from '../utils/common'
import { numRows, square } from '../utils/linearAlgebra'

export default (X, y, theta) => {
  const m = numRows(X)
  const _errors = errors(X, theta, y)
  const cost = 1 / (2 * m) * square(_errors)

  return cost
}
