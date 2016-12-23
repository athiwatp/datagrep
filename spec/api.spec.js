import datagrep, { default as dgrep, gradientDescent, computeCost, utils } from '../src/index';

describe("datagrep API", () => {

  it("has a default and named export which are equal", () => {
      expect(dgrep).toBe(datagrep);
  });

  it("has named exports", () => {
      expect(computeCost).toBe(datagrep.computeCost);
      expect(gradientDescent).toBe(datagrep.gradientDescent);
      expect(utils).toBe(datagrep.utils);
  });

});