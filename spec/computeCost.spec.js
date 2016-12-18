import computeCost from '../src/app/computeCost';
import { parseCsv } from '../src/utils/csv';
import { getNullMatrix, numCols, parseVariableMatrices } from '../src/utils/linearAlgebra';
import text from './ex1data1.txt';

describe("computeCost", () => {

  it("computes the cost", async (done) => {
      let data = await parseCsv(text);
      let { X, y } = parseVariableMatrices(data);
      let theta = getNullMatrix(1, numCols(X));
      let cost = computeCost(X, y, theta);

      expect(Number.parseFloat(cost.toFixed(4))).toBe(32.0727);
      done();
  });

});