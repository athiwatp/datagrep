/* eslint-env jest */
import datagrep, { utils } from '../../src/index'
import path from 'path'

describe('datagrep.polynomialFeatureMapSync', () => {
  const { csv, linearAlgebra } = utils

  it('adds polynomial features up to the provided degree', () => {
    const data = csv.parseCsvSync(path.resolve('spec/data/sample3.csv'))
    const { X } = linearAlgebra.splitXySync(data, false)
    const { X: X1, y: X2 } = linearAlgebra.splitXySync(X, false) // TODO: generalize method
    const mapping = datagrep.polynomialFeatureMapSync(X1, X2, 6)
    const numRows = X.length
    const numCols = linearAlgebra.numColsSync(mapping)
    const midCol = numCols / 2
    const midRow = numRows / 2 - 1
    const lastCol = numCols - 1
    const lastRow = numRows - 1

    expect(mapping[0][3]).toBe(0.002628305289)
    expect(mapping[0][midCol]).toBe(0.23949688894552223)
    expect(mapping[0][lastCol]).toBe(0.11720599186631314)
    expect(mapping[midRow][3]).toBe(0.0337677376)
    expect(mapping[midRow][midCol]).toBe(0.759311662072816)
    expect(mapping[midRow][lastCol]).toBe(0.6616527246209958)
    expect(mapping[lastRow][3]).toBe(0.4002460225000001)
    expect(mapping[lastRow][midCol]).toBe(8.781461843945681e-7)
    expect(mapping[lastRow][lastCol]).toBe(8.229059982305678e-10)
  })
})
