import {
    dot,
    pinv,
    transpose
} from '../utils/linearAlgebra'

export default (X, y) => {
  const transposeX = transpose(X)
  const theta = dot(pinv(dot(transposeX, X)), dot(transposeX, y))

  return theta
}
