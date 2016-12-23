import nj from 'numjs'

export {
  dot,
  multiply,
  nullMatrix,
  numCols,
  numRows,
  splitXy,
  subtract,
  square,
  transpose
}

function dot (a, b) {
  return nj.dot(a, b).tolist()
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

function nullMatrix (numRows, numCols) {
  return nj.zeros([numRows, numCols]).tolist()
}

function numCols (matrix) {
  return nj.array(matrix).shape[1]
}

function numRows (matrix) {
  return nj.array(matrix).shape[0]
}

function splitXy (data) {
  const dataAsMatrix = nj.array(data)
  const [numRows, numCols] = dataAsMatrix.shape
  const X = nj.concatenate(nj.ones([numRows, 1]), dataAsMatrix.slice(0, [numCols - 1])).tolist()
  const y = dataAsMatrix.slice(0, -1).tolist()

  return { X, y }
}

function subtract (a, b) {
  return nj.subtract(a, b).tolist()
}

function square (errors) {
  errors = nj.array(errors)
  return errors.T.dot(errors).tolist()[0][0]
}

function transpose (a) {
  return nj.array(a).T.tolist()
}
