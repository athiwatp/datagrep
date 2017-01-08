/* eslint-env jest */
import { utils } from '../src/index'
import path from 'path'
const parseFloat = Number.parseFloat
const precision = 12

describe('datagrep.linearAlgebra', () => {
  const { csv, linearAlgebra } = utils
  const {
    add,
    dot,
    magnitude,
    multiply,
    normalize,
    splitXy,
    subtract,
    svd,
    transpose
  } = linearAlgebra

  describe('svd', () => {
    it('returns the singular value decomposition', async () => {
      const data = await csv.parseCsv(path.resolve('spec/data/sample1.csv'))
      const { X } = splitXy(data)
      const transposeX = transpose(X)
      const M = dot(transposeX, X)
      const [U, Σ, V, s] = svd(M)
      const transposeV = transpose(V)

      const _M = dot(U, dot(Σ, V))

      expect(parseFloat(U[0][0])).toBe(-0.0004329688371766067)
      expect(parseFloat(U[0][1])).toBe(0.2892450879376866)
      expect(parseFloat(U[0][2])).toBe(-0.9572549773398447)
      expect(parseFloat(U[1][0])).toBe(-0.9999988632238788)
      expect(parseFloat(U[1][1])).toBe(-0.001507826260650405)
      expect(parseFloat(U[1][2])).toBe(-0.0000033042339224693554)
      expect(parseFloat(U[2][0])).toBe(-0.0014443299264028464)
      expect(parseFloat(U[2][1])).toBe(0.9572538877246142)
      expect(parseFloat(U[2][2])).toBe(0.2892454119725601)

      expect(parseFloat(Σ[0][0])).toBe(217179899.76945397)
      expect(parseFloat(Σ[1][1])).toBe(49.92800246161647) // matlab says 0
      expect(parseFloat(Σ[2][2])).toBe(2.3025435515414254) // matlab says 0
      expect(Σ[0][0]).toBe(s[0])
      expect(Σ[1][1]).toBe(s[1])
      expect(Σ[2][2]).toBe(s[2])

      expect(parseFloat(transposeV[0][0])).toBe(-0.00043296883717683533)
      expect(parseFloat(transposeV[0][1])).toBe(0.28924508793749687)
      expect(parseFloat(transposeV[0][2])).toBe(-0.957254977339902)
      expect(parseFloat(transposeV[1][0])).toBe(-0.9999988632238789)
      expect(parseFloat(transposeV[1][1])).toBe(-0.0015078262606505112)
      expect(parseFloat(transposeV[1][2])).toBe(-0.000003304233921993771)
      expect(parseFloat(transposeV[2][0])).toBe(-0.0014443299264028462)
      expect(parseFloat(transposeV[2][1])).toBe(0.9572538877246716)
      expect(parseFloat(transposeV[2][2])).toBe(0.28924541197237047)

      expect(parseFloat(_M[0][0].toPrecision(precision))).toBe(M[0][0])
      expect(parseFloat(_M[0][1].toPrecision(precision))).toBe(M[0][1])
      expect(parseFloat(_M[0][2].toPrecision(precision))).toBe(M[0][2])
      expect(parseFloat(_M[1][0].toPrecision(precision))).toBe(M[1][0])
      expect(parseFloat(_M[1][1].toPrecision(precision))).toBe(M[1][1])
      expect(parseFloat(_M[1][2].toPrecision(precision))).toBe(M[1][2])
      expect(parseFloat(_M[2][0].toPrecision(precision))).toBe(M[2][0])
      expect(parseFloat(_M[2][1].toPrecision(precision))).toBe(M[2][1])
      expect(parseFloat(_M[2][2].toPrecision(precision))).toBe(M[2][2])
    })
  })

  describe('add', () => {
    it('adds vectors', () => {
      const a = [8.218, -9.341]
      const b = [-1.129, 2.111]
      const sum = add(a, b)

      expect(sum[0]).toBe(7.089)
      expect(parseFloat(sum[1].toPrecision(precision))).toBe(-7.230)
    })
  })

  describe('subtract', () => {
    it('subtracts vectors', () => {
      const a = [7.119, 8.215]
      const b = [-8.223, 0.878]
      const diff = subtract(a, b)

      expect(diff[0]).toBe(15.342)
      expect(diff[1]).toBe(7.337)
    })
  })

  describe('multiply', () => {
    it('multiplies a scalar and a vector', () => {
      const a = 7.41
      const b = [1.671, -1.012, -0.318]
      const product = multiply(a, b)

      expect(product[0]).toBe(12.38211)
      expect(product[1]).toBe(-7.49892)
      expect(product[2]).toBe(-2.35638)
    })
  })

  describe('magnitude', () => {
    it('returns the magnitude of a vector', () => {
      const a = [-0.221, 7.437]
      const b = [8.813, -1.331, -6.247]

      expect(magnitude(a)).toBe(7.440282924728065)
      expect(magnitude(b)).toBe(10.884187567292289)
    })
  })

  describe('normalize', () => {
    it('returns the normalized vector', () => {
      const a = [5.581, -2.136]
      const b = [1.996, 3.108, -4.554]
      const normA = normalize(a)
      const normB = normalize(b)

      expect(normA[0]).toBe(0.9339352140866403)
      expect(normA[1]).toBe(-0.35744232526233)
      expect(normB[0]).toBe(0.3404012959433014)
      expect(normB[1]).toBe(0.5300437012984873)
      expect(normB[2]).toBe(-0.7766470449528029)
    })
  })
})
