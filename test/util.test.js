import { convertToIntOrFallback } from "../src/util.js";
import assert from "assert";

describe("Utility functions", function () {
  describe("#convertToIntOrFallback", function () {
    it("should convert a valid string to a number", function () {
      assert.equal(convertToIntOrFallback("1"), 1);
      assert.equal(convertToIntOrFallback("1337"), 1337);
    });
    it("should return 0 for an invalid string", function () {
      assert.equal(convertToIntOrFallback("foobar"), 0);
    });
    it("should return 0 for type-mismatching arguments", function () {
      assert.equal(convertToIntOrFallback({ foo: "bar" }), 0);
      assert.equal(convertToIntOrFallback(null), 0);
      assert.equal(convertToIntOrFallback(undefined), 0);
    });
    it("should pass through numbers", function () {
      assert.equal(convertToIntOrFallback(0), 0);
      assert.equal(convertToIntOrFallback(420), 420);
    });
  });
});
