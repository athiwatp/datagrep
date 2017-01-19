import {
    dotSync,
    pinvSync,
    transposeSync
} from '../utils/linearAlgebra'

export default (X, y) => {
  const transposeX = transposeSync(X)
  const theta = dotSync(pinvSync(dotSync(transposeX, X)), dotSync(transposeX, y))

  return theta
}
