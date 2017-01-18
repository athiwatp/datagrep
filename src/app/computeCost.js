import { errors } from '../utils/common'
import { numRows, square } from '../utils/linearAlgebra'

export default (X, y, theta) => {
  const m = numRows(X)
  const cost = 1 / (2 * m) * square(errors(X, theta, y))

  return cost
}
