import {
    dot,
    pinv,
    transpose
} from '../../../utils/linearAlgebra'

export default (X, y, callback = () => {}) => {
  return new Promise(async (resolve, reject) => {
    const transposeX = await transpose(X)
    const theta = await dot(await pinv(await dot(transposeX, X)), await dot(transposeX, y))

    callback(theta)
    resolve(theta)
  })
}
