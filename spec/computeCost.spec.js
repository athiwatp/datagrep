import datagrep, { utils } from '../src/index';
import text from './ex1data1.txt';

describe("datagrep.computeCost", () => {
  const { csv, linearAlgebra } = utils;

  it("computes the cost", async (done) => {
      let data = await csv.parseCsv(text);
      let { X, y } = linearAlgebra.parseVariableMatrices(data);
      let theta = linearAlgebra.getNullMatrix(1, linearAlgebra.numCols(X));
      let cost = datagrep.computeCost(X, y, theta);

      expect(Number.parseFloat(cost.toFixed(4))).toBe(32.0727);
      done();
  });

});