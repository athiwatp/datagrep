import {
    divide,
    mean,
    subtract,
    std
} from '../utils/linearAlgebra'

export default (X) => {
  const mu = mean(X)
  const sigma = std(X)
  const first = subtract(X, mu)
  const normX = divide(first, sigma)

  return [normX, mu, sigma]
}
