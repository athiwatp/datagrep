import { asyncify } from './common'
import nj from 'numjs'
import numeric from 'numericjs'
import { Matrix, Vector } from 'vectorious'
const parseFloat = Number.parseFloat

export {
  add,
  addSync,
  angle,
  angleSync,
  crossproduct,
  crossproductSync,
  divide,
  divideSync,
  dot,
  dotSync,
  fminunc,
  fminuncSync,
  isParallel,
  isParallelSync,
  isOrthogonal,
  isOrthogonalSync,
  log,
  logSync,
  magnitude,
  magnitudeSync,
  max,
  maxSync,
  mean,
  meanSync,
  multiply,
  multiplySync,
  normalize,
  normalizeSync,
  nullMatrix,
  nullMatrixSync,
  numCols,
  numColsSync,
  numRows,
  numRowsSync,
  pinv,
  pinvSync,
  project,
  projectSync,
  projectAndReject,
  projectAndRejectSync,
  reject,
  rejectSync,
  sigmoid,
  sigmoidSync,
  splitXy,
  splitXySync,
  square,
  squareSync,
  std,
  stdSync,
  subtract,
  subtractSync,
  svd,
  svdSync,
  transpose,
  transposeSync,
  unit,
  unitSync
}

function _arithmetic (operation, a, b) {
  operation = nj[operation]
  a = nj.array(a)
  b = nj.array(b)

  if (a.size !== b.size) {
    // broadcast
    let results
    if (a.size === 1) {
      results = [b.tolist().map((currentValue, index) => {
        let col = a.tolist()
        let result = operation(col, currentValue).tolist()
        return result
      })]
    } else if (b.size === 1) {
      results = a.tolist().map((currentValue, index) => {
        let col = b.tolist()
        let result = operation(col, currentValue).tolist()
        return result
      })
    } else {
      results = b.tolist().map((currentValue, index) => {
        let col = a.slice(0, [index, index + 1]).tolist()
        let result = operation(col, currentValue).tolist()
        return result
      })
    }
    return transposeSync(results)[0]
  }

  return operation(a, b).tolist()
}

function add (a, b, callback = () => {}) {
  return asyncify(addSync, callback)(...arguments)
}

function addSync (a, b) {
  return new Vector(a).add(new Vector(b)).toArray()
}

function angle (a, b, convertToDegrees = false, callback = () => {}) {
  return asyncify(angleSync, callback)(...arguments)
}

function angleSync (a, b, convertToDegrees = false) {
  const degreesPerRadian = 180 / Math.PI
  const radians = new Vector(a).angle(new Vector(b))

  if (convertToDegrees) return radians * degreesPerRadian
  return radians
}

function crossproduct (a, b, callback = () => {}) {
  return asyncify(crossproductSync, callback)(...arguments)
}

function crossproductSync (a, b) {
  const i = new Matrix([a.slice(1), b.slice(1)]).determinant()
  const j = -new Matrix([a.slice(0, 1).concat(a.slice(2)), b.slice(0, 1).concat(b.slice(2))]).determinant()
  const k = new Matrix([a.slice(0, 2), b.slice(0, 2)]).determinant()
  return [i, j, k]
}

function divide (a, b, callback = () => {}) {
  return asyncify(divideSync, callback)(...arguments)
}

function divideSync (a, b) {
  return _arithmetic('divide', a, b)
}

function dot (a, b, callback = () => {}) {
  return asyncify(dotSync, callback)(...arguments)
}

function dotSync (a, b) {
  return nj.dot(a, b).tolist()
}

function fminunc (f, thetaInitial, callback = () => {}) {
  return asyncify(fminuncSync, callback)(...arguments)
}

function fminuncSync (fn, thetaInitial, options = {}) {
  function _toX (x) {
    return transposeSync(x)[0]
  }

  function _fromX (x) {
    return x.map((value, index, array) => {
      return [value]
    })
  }

  const { f, solution } = numeric.uncmin(function (x) {
    return fn.call(this, _fromX(x)).cost
  }, _toX(thetaInitial), options.tol, options.gradient, options.maxit)

  return {
    cost: f[0],
    theta: solution
  }
}

function isParallel (a, b, precision = 21, callback = () => {}) {
  return asyncify(isParallelSync, callback)(...arguments)
}

function isParallelSync (a, b, precision = 21) {
  let radians = parseFloat(angleSync(a, b).toPrecision(precision))
  return isNaN(radians) || radians === 0 || radians === parseFloat(Math.PI.toPrecision(precision))
}

function isOrthogonal (a, b, precision = 21, callback = () => {}) {
  return asyncify(isOrthogonalSync, callback)(...arguments)
}

function isOrthogonalSync (a, b, precision = 21) {
  let radians = parseFloat(angleSync(a, b).toPrecision(precision))
  return isNaN(radians) || radians === parseFloat((Math.PI / 2).toPrecision(precision))
}

function log (a, callback = () => {}) {
  return asyncify(logSync, callback)(...arguments)
}

function logSync (a) {
  return numeric.log(a)
}

function magnitude (a, callback = () => {}) {
  return asyncify(magnitudeSync, callback)(...arguments)
}

function magnitudeSync (a) {
  return new Vector(a).magnitude()
}

function max (a, callback = () => {}) {
  return asyncify(maxSync, callback)(...arguments)
}

function maxSync (a) {
  // TODO: accomodate any dimension
  return nj.max(a)
}

function mean (a, callback = () => {}) {
  return asyncify(meanSync, callback)(...arguments)
}

function meanSync (a) {
  const _numRows = numRowsSync(a)
  const sums = a.reduce((accumulator, currentValue) => {
    currentValue.forEach((currentValue, index) => {
      accumulator[index] += currentValue
    })
    return accumulator
  }, new Array(numColsSync(a)).fill(0))
  const mean = sums.map((currentValue) => {
    return currentValue / _numRows
  })

  return mean
}

function multiply (a, b, callback = () => {}) {
  return asyncify(multiplySync, callback)(...arguments)
}

function multiplySync (a, b) {
  let result
  try {
    result = nj.multiply(a, b)
  } catch (error) {
    result = nj.multiply(b, a)
  }

  return result.tolist()
}

function normalize (a, callback = () => {}) {
  return asyncify(normalizeSync, callback)(...arguments)
}

function normalizeSync (a) {
  return new Vector(a).normalize().toArray()
}

function nullMatrix (numRows, numCols, callback = () => {}) {
  return asyncify(nullMatrixSync, callback)(...arguments)
}

function nullMatrixSync (numRows, numCols) {
  return nj.zeros([numRows, numCols]).tolist()
}

function numCols (a, callback = () => {}) {
  return asyncify(numColsSync, callback)(...arguments)
}

function numColsSync (a) {
  return nj.array(a).shape[1] || 1
}

function numRows (a, callback = () => {}) {
  return asyncify(numRowsSync, callback)(...arguments)
}

function numRowsSync (a) {
  return nj.array(a).shape[0]
}

/**
 * Compute the (Moore-Penrose) pseudo-inverse (pinv) of a matrix asynchronously.
 * @param {Array[]} M - the matrix
 * @returns {Promise<Array[], Error>} resolves to pinvM - the calculated pseudo-inverse
 */
function pinv (M, callback = () => {}) {
  return asyncify(pinvSync, callback)(...arguments)
}

/**
 * Compute the (Moore-Penrose) pseudo-inverse (pinv) of a matrix synchronously.
 * @param {Array[]} M - the matrix
 * @returns {Array[]} pinvM - the calculated pseudo-inverse
 */
function pinvSync (M) {
  let [U,, V, s] = svdSync(M)
  const ε = numeric.epsilon
  const m = numRowsSync(U)
  const n = numColsSync(transposeSync(V))
  const diagDim = Math.max(m, n)
  const tolerance = ε * diagDim * maxSync(s)
  const pinvΣ = transposeSync(numeric.diag(s.map((sNum, index) => {
    return index < diagDim && sNum > tolerance ? 1 / sNum : 0
  })))
  const transposeU = transposeSync(U)
  const pinvM = dotSync(transposeSync(V), dotSync(pinvΣ, transposeU))

  return pinvM
}

function project (a, b, callback = () => {}) {
  return asyncify(projectSync, callback)(...arguments)
}

function projectSync (a, b) {
  return new Vector(a).project(new Vector(b)).toArray()
}

function projectAndReject (a, b, callback = () => {}) {
  return asyncify(projectAndRejectSync, callback)(...arguments)
}

function projectAndRejectSync (a, b) {
  return {
    projection: projectSync(a, b),
    rejection: rejectSync(a, b)
  }
}

function reject (a, b, callback = () => {}) {
  return asyncify(rejectSync, callback)(...arguments)
}

function rejectSync (a, b) {
  return subtractSync(a, projectSync(a, b))
}

function sigmoid (a, callback = () => {}) {
  return asyncify(sigmoidSync, callback)(...arguments)
}

function sigmoidSync (a) {
  return nj.sigmoid(a).tolist()
}

/**
 * Compute the singular value decomposition (SVD) of a matrix asynchronously.
 * @param {Array[]} M - the matrix
 * @returns {Promise<Array[], Error>} resolves to [U, Σ, V, s] - the calculated singular value decomposition
 */
function svd (a, callback = () => {}) {
  return asyncify(svdSync, callback)(...arguments)
}

/**
 * Compute the singular value decomposition (SVD) of a matrix synchronously.
 * @param {Array[]} M - the matrix
 * @returns {Array[]} [U, Σ, V, s] - the calculated singular value decomposition
 */
function svdSync (M) {
  const res = numeric.svd(M)
  const U = res.U
  const s = res.S // singular values, or s-numbers
  const Σ = numeric.diag(s)
  const transposeV = res.V
  const V = transposeSync(transposeV)

  return [U, Σ, V, s]
}

function splitXy (data, addOnes = true, callback = () => {}) {
  return asyncify(splitXySync, callback)(...arguments)
}

function splitXySync (data, addOnes = true) {
  const dataAsMatrix = nj.array(data)
  const [numRows, numCols] = dataAsMatrix.shape
  const y = dataAsMatrix.slice(0, -1).tolist()
  let X = dataAsMatrix.slice(0, [numCols - 1])
  if (addOnes) X = nj.concatenate(nj.ones([numRows, 1]), X)
  X = X.tolist()

  return { X, y }
}

function square (a, callback = () => {}) {
  return asyncify(squareSync, callback)(...arguments)
}

function squareSync (a) {
  a = nj.array(a)

  return a.T.dot(a).tolist()[0][0]
}

function std (a, callback = () => {}) {
  return asyncify(stdSync, callback)(...arguments)
}

function stdSync (a) {
  const t = nj.array(a).T
  const options = { 'ddof': 1 }
  const stdDevs = t.tolist().map((row) => {
    return nj.array(row).std(options)
  })

  return stdDevs
}

function subtract (a, b, callback = () => {}) {
  return asyncify(subtractSync, callback)(...arguments)
}

function subtractSync (a, b) {
  return _arithmetic('subtract', a, b)
}

function transpose (a, callback = () => {}) {
  return asyncify(transposeSync, callback)(...arguments)
}

function transposeSync (a) {
  return nj.array(a).T.tolist()
}

function unit (a, callback = () => {}) {
  return asyncify(unitSync, callback)(...arguments)
}

function unitSync (a) {
  return multiplySync(a, 1 / magnitude(a))
}
