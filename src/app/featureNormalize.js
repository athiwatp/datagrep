import {
    divide,
    mean,
    subtract,
    std
} from '../utils/linearAlgebra'

export default (X) => {
  const mu = mean(X)
  const sigma = std(X)
  const normX = divide(subtract(X, mu), sigma)

  return [normX, mu, sigma]
}
