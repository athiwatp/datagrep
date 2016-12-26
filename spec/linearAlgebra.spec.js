/* eslint-env jest */
import datagrep, { utils } from '../src/index'
import path from 'path'

describe('datagrep.linearAlgebra', () => {
  const { csv, linearAlgebra } = utils

  describe('svd', () => {
    it('returns the singular value decomposition', async () => {
      const data = await csv.parseCsv(path.resolve('spec/data/sample1.csv'))
      const { X } = linearAlgebra.splitXy(data)
      const transposeX = linearAlgebra.transpose(X)
      const M = linearAlgebra.dot(transposeX, X)
      const [U, Σ, V, s] = linearAlgebra.svd(M)
      const transposeV = linearAlgebra.transpose(V)

      const _M = linearAlgebra.dot(U, linearAlgebra.dot(Σ, V))

      expect(Number.parseFloat(U[0][0].toFixed(7))).toBe(-0.000433)
      expect(Number.parseFloat(U[0][1].toFixed(7))).toBe(0.2892451)
      expect(Number.parseFloat(U[0][2].toFixed(7))).toBe(-0.957255)
      expect(Number.parseFloat(U[1][0].toFixed(7))).toBe(-0.9999989)
      expect(Number.parseFloat(U[1][1].toFixed(7))).toBe(-0.0015078)
      expect(Number.parseFloat(U[1][2].toFixed(7))).toBe(-0.0000033)
      expect(Number.parseFloat(U[2][0].toFixed(7))).toBe(-0.0014443)
      expect(Number.parseFloat(U[2][1].toFixed(7))).toBe(0.9572539)
      expect(Number.parseFloat(U[2][2].toFixed(7))).toBe(0.2892454)

      expect(Number.parseFloat(Σ[0][0].toFixed(7))).toBe(217179899.769454)
      expect(Number.parseFloat(Σ[1][1].toFixed(7))).toBe(49.9280025) // matlab says 0
      expect(Number.parseFloat(Σ[2][2].toFixed(7))).toBe(2.3025436) // matlab says 0
      expect(Σ[0][0]).toBe(s[0])
      expect(Σ[1][1]).toBe(s[1])
      expect(Σ[2][2]).toBe(s[2])

      expect(Number.parseFloat(transposeV[0][0].toFixed(7))).toBe(-0.000433)
      expect(Number.parseFloat(transposeV[0][1].toFixed(7))).toBe(0.2892451)
      expect(Number.parseFloat(transposeV[0][2].toFixed(7))).toBe(-0.957255)
      expect(Number.parseFloat(transposeV[1][0].toFixed(7))).toBe(-0.9999989)
      expect(Number.parseFloat(transposeV[1][1].toFixed(7))).toBe(-0.0015078)
      expect(Number.parseFloat(transposeV[1][2].toFixed(7))).toBe(-0.0000033)
      expect(Number.parseFloat(transposeV[2][0].toFixed(7))).toBe(-0.0014443)
      expect(Number.parseFloat(transposeV[2][1].toFixed(7))).toBe(0.9572539)
      expect(Number.parseFloat(transposeV[2][2].toFixed(7))).toBe(0.2892454)

      expect(_M[0][0].toFixed(7)).toBe(M[0][0].toFixed(7))
      expect(_M[0][1].toFixed(7)).toBe(M[0][1].toFixed(7))
      expect(_M[0][2].toFixed(7)).toBe(M[0][2].toFixed(7))
      expect(_M[1][0].toFixed(7)).toBe(M[1][0].toFixed(7))
      expect(_M[1][1].toFixed(7)).toBe(M[1][1].toFixed(7))
      expect(_M[1][2].toFixed(7)).toBe(M[1][2].toFixed(7))
      expect(_M[2][0].toFixed(7)).toBe(M[2][0].toFixed(7))
      expect(_M[2][1].toFixed(7)).toBe(M[2][1].toFixed(7))
      expect(_M[2][2].toFixed(7)).toBe(M[2][2].toFixed(7))
    })
  })
})
