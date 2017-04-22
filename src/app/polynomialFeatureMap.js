import {
    addColumn,
    ones,
    power,
    product
} from '../utils/linearAlgebra'

export default async (X1, X2, degree) => {
  let mapping = await ones(X1.length)

  for (let i = 1; i <= degree; i++) {
    for (let j = 0; j <= i; j++) {
      const col = await product(await power(X1, i - j), await power(X2, j))
      mapping = await addColumn(mapping, col)
    }
  }

  return mapping
}
