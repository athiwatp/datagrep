/* eslint-env jest */
import datagrep, { default as dgrep, regression, utils } from '../src/index'

describe('datagrep API', () => {
  it('has a default and named export which are equal', () => {
    expect(dgrep).toBe(datagrep)
  })

  it('has named exports', () => {
    expect(regression).toBe(datagrep.regression)
    expect(utils).toBe(datagrep.utils)
  })
})
