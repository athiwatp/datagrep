import {
    divideSync,
    meanSync,
    subtractSync,
    stdSync
} from '../utils/linearAlgebra'

export default (X) => {
  const mu = meanSync(X)
  const sigma = stdSync(X)
  const normX = divideSync(subtractSync(X, mu), sigma)

  return [normX, mu, sigma]
}
