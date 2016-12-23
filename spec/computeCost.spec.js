/* eslint-env jasmine */
import datagrep, { utils } from '../src/index'
import text from './ex1data1.txt'

describe('datagrep.computeCost', () => {
  const { csv, linearAlgebra } = utils

  it('computes the cost', async (done) => {
    let data = await csv.parseCsv(text)
    let { X, y } = linearAlgebra.splitXy(data)
    let theta = linearAlgebra.nullMatrix(linearAlgebra.numCols(X), 1)
    let cost = datagrep.computeCost(X, y, theta)

    expect(Number.parseFloat(cost.toFixed(4))).toBe(32.0727)
    done()
  })
})
