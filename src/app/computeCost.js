import { errors } from '../utils/common'
import { numRows, square } from '../utils/linearAlgebra'

export default (X, y, theta, callback = () => {}) => {
  return new Promise(async (resolve, reject) => {
    const m = await numRows(X)
    const cost = 1 / (2 * m) * await square(await errors(X, theta, y))

    callback(cost)
    resolve(cost)
  })
}
