import { errorsSync } from '../../../utils/common'
import { numRowsSync, squareSync } from '../../../utils/linearAlgebra'

export default (X, y, theta) => {
  const m = numRowsSync(X)
  const cost = 1 / (2 * m) * squareSync(errorsSync(X, theta, y))

  return cost
}
