import {
  add,
  dot,
  log,
  mean,
  multiply,
  numRows,
  product,
  sigmoid,
  subtract,
  transpose
} from '../../../utils/linearAlgebra'

export default async (X, y, theta, lambda) => {
  const m = await numRows(X)
  const h = await sigmoid(await dot(X, theta))
  const minuend = await product(await multiply(y, -1), await log(h))
  const subtrahend = await product(await subtract(1, y), await log(await subtract(1, h)))
  const cost = (await mean(await subtract(minuend, subtrahend)))[0]
  const thetaReg = [[0]].concat(theta.slice(1))
  const costRegFactor = (lambda / 2 / m) * await dot(await transpose(thetaReg), thetaReg)
  const gradient = await multiply((1 / m), await dot(await transpose(await subtract(h, y)), X))
  const gradientRegFactor = await transpose(await multiply(lambda / m, thetaReg))

  return {
    cost: cost + costRegFactor,
    gradient: await add(gradient, gradientRegFactor)
  }
}
