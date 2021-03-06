import {
    addColumnSync,
    onesSync,
    powerSync,
    productSync
} from '../utils/linearAlgebra'

export default (X1, X2, degree) => {
  let mapping = onesSync(X1.length)

  for (let i = 1; i <= degree; i++) {
    for (let j = 0; j <= i; j++) {
      const col = productSync(powerSync(X1, i - j), powerSync(X2, j))
      mapping = addColumnSync(mapping, col)
    }
  }

  return mapping
}
