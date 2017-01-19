import {
    divide,
    mean,
    subtract,
    std
} from '../utils/linearAlgebra'

export default async (X) => {
  const mu = await mean(X)
  const sigma = await std(X)
  const normX = await divide(await subtract(X, mu), sigma)

  return [normX, mu, sigma]
}
