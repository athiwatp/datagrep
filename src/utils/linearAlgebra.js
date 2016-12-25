import nj from 'numjs'

export {
  divide,
  dot,
  mean,
  multiply,
  nullMatrix,
  numCols,
  numRows,
  splitXy,
  square,
  std,
  subtract,
  transpose
}

function divide (a, b) {
  // TODO: DRY - this is very similar to subtract
  a = nj.array(a)
  b = nj.array(b)

  if (a.size !== b.size) {
    let quotients = b.tolist().map((currentValue, index) => {
      let col = a.slice(0, [index, index + 1]).tolist()
      let quotient = nj.divide(col, currentValue).tolist()
      return quotient
    })
    return transpose(quotients)[0]
  }

  return nj.divide(a, b).tolist()
}

function dot (a, b) {
  return nj.dot(a, b).tolist()
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

function nullMatrix (numRows, numCols) {
  return nj.zeros([numRows, numCols]).tolist()
}

function numCols (a) {
  return nj.array(a).shape[1]
}

function numRows (a) {
  return nj.array(a).shape[0]
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

  const stdDevs = t.tolist().map((row) => {
    return nj.array(row).std(false)
  })
  return stdDevs
}

function subtract (a, b) {
  a = nj.array(a)
  b = nj.array(b)

  if (a.size !== b.size) {
    let diffs = b.tolist().map((currentValue, index) => {
      let col = a.slice(0, [index, index + 1]).tolist()
      let diff = nj.subtract(col, currentValue).tolist()
      return diff
    })
    return transpose(diffs)[0]
  }

  return nj.subtract(a, b).tolist()
}

function transpose (a) {
  return nj.array(a).T.tolist()
}
