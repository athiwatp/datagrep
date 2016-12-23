import datagrep, { utils } from '../src/index';
import text from './ex1data1.txt';

describe("datagrep.gradientDescent", () => {
  const { csv, linearAlgebra } = utils;

  it("performs gradient descent", async (done) => {
      let data = await csv.parseCsv(text),
          { X, y } = linearAlgebra.splitXy(data),
          theta = linearAlgebra.nullMatrix(linearAlgebra.numCols(X), 1),
          alpha = 0.01,
          iterations = 1500,
          [theta_0, theta_1] = datagrep.gradientDescent(X, y, theta, alpha, iterations);

      expect(Number.parseFloat(theta_0[0].toFixed(6))).toBe(-3.630291);
      expect(Number.parseFloat(theta_1[0].toFixed(6))).toBe(1.166362);
      done();
  });

});