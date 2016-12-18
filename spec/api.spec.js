import datagrep, { default as dg, computeCost, utils } from '../src/index';

describe("datagrep API", () => {

  it("has a default and named export which are equal", () => {
      expect(dg).toBe(datagrep);
  });

  it("has named exports", () => {
      expect(computeCost).toBe(datagrep.computeCost);
      expect(utils).toBe(datagrep.utils);
  });

});