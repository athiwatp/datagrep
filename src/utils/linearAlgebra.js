import nj from 'numjs'
import numeric from 'numericjs'
import { Vector } from 'vectorious'

export {
  add,
  angle,
  divide,
  dot,
  isParallel,
  isOrthogonal,
  magnitude,
  max,
  mean,
  multiply,
  normalize,
  nullMatrix,
  numCols,
  numRows,
  pinv,
  splitXy,
  square,
  std,
  subtract,
  svd,
  transpose
}

function _approximateMachineEpsilon () {
  let epsilon = 1.0

  while ((1.0 + 0.5 * epsilon) !== 1.0) {
    epsilon = 0.5 * epsilon
  }

  return epsilon
}

function _arithmetic (operation, a, b) {
  operation = nj[operation]
  a = nj.array(a)
  b = nj.array(b)

  if (a.size !== b.size) {
    let results = b.tolist().map((currentValue, index) => {
      let col = a.slice(0, [index, index + 1]).tolist()
      let result = operation(col, currentValue).tolist()
      return result
    })
    return transpose(results)[0]
  }

  return operation(a, b).tolist()
}

function add (a, b) {
  return new Vector(a).add(new Vector(b)).toArray()
}

function angle (a, b, convertToDegrees = false) {
  const degreesPerRadian = 180 / Math.PI
  const radians = new Vector(a).angle(new Vector(b))

  if (convertToDegrees) return radians * degreesPerRadian
  return radians
}

function divide (a, b) {
  return _arithmetic('divide', a, b)
}

function dot (a, b) {
  return nj.dot(a, b).tolist()
}

function isParallel (a, b) {
  let radians = angle(a, b)
  console.log('radians: ', radians)
  return isNaN(radians) || radians === 0 || radians === Math.PI
}

function isOrthogonal (a, b) {
  let radians = angle(a, b)
  console.log('radians: ', radians)
  return isNaN(radians) || radians === Math.PI / 2
}

function magnitude (a) {
  return new Vector(a).magnitude()
}

function max (a) {
  // TODO: accomodate any dimension
  return nj.max(a)
}

function mean (a) {
  const _numRows = numRows(a)
  const sums = a.reduce((accumulator, currentValue) => {
    currentValue.forEach((currentValue, index) => {
      accumulator[index] += currentValue
    })
    return accumulator
  }, new Array(numCols(a)).fill(0))
  const mean = sums.map((currentValue) => {
    return currentValue / _numRows
  })

  return mean
}

function multiply (a, b) {
  let result
  try {
    result = nj.multiply(a, b)
  } catch (error) {
    result = nj.multiply(b, a)
  }

  return result.tolist()
}

function normalize (a) {
  return new Vector(a).normalize().toArray()
}

function nullMatrix (numRows, numCols) {
  return nj.zeros([numRows, numCols]).tolist()
}

function numCols (a) {
  return nj.array(a).shape[1] || 1
}

function numRows (a) {
  return nj.array(a).shape[0]
}

function pinv (M, rcond = 1e-15) {
  let [U,, V, s] = svd(M)
  const ε = _approximateMachineEpsilon()
  const m = numRows(U)
  const n = numCols(transpose(V))
  const diagDim = Math.max(m, n)
  const tolerance = ε * diagDim * max(s)
  const pinvΣ = transpose(numeric.diag(s.map((sNum, index) => {
    return index < diagDim && sNum > tolerance ? 1 / sNum : 0
  })))
  const transposeU = transpose(U)
  const pinvM = dot(transpose(V), dot(pinvΣ, transposeU))

  return pinvM
}

// singular value decomposition
function svd (a) {
  const res = numeric.svd(a)
  const U = res.U
  const s = res.S // singular values, or s-numbers
  const Σ = numeric.diag(s)
  const transposeV = res.V
  const V = transpose(transposeV)

  return [U, Σ, V, s]
}

function splitXy (data, addOnes = true) {
  const dataAsMatrix = nj.array(data)
  const [numRows, numCols] = dataAsMatrix.shape
  const y = dataAsMatrix.slice(0, -1).tolist()
  let X = dataAsMatrix.slice(0, [numCols - 1])
  if (addOnes) X = nj.concatenate(nj.ones([numRows, 1]), X)
  X = X.tolist()

  return { X, y }
}

function square (a) {
  a = nj.array(a)

  return a.T.dot(a).tolist()[0][0]
}

function std (a) {
  const t = nj.array(a).T
  const options = { 'ddof': 1 }
  const stdDevs = t.tolist().map((row) => {
    return nj.array(row).std(options)
  })

  return stdDevs
}

function subtract (a, b) {
  return _arithmetic('subtract', a, b)
}

function transpose (a) {
  return nj.array(a).T.tolist()
}
