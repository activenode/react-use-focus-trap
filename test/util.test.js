import {
  convertToIntOrFallback,
  getTabIndexOfNode,
  sortByTabIndex,
} from "../src/util.js";
import assert from "assert";
import { JSDOM } from "jsdom";

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

  describe("#sortByTabIndex", function () {
    let tabIndexedNodes;
    beforeEach(function () {
      const dom = new JSDOM(
        `<html>
           <body>
             <button id="one" tabindex="2">1</button>
             <button id="two" tabindex="1">2</button>
             <button id="three" tabindex="-1">3</button>
             <button id="four" tabindex="0">4</button>
             <button tabindex="-1">5</button>
             <button tabindex="3">6</button>
             <button tabindex="0">7</button>
           </body>
         </html>`
      );
      tabIndexedNodes = dom.window.document.querySelectorAll("button");
    });
    it("should sort by tabindex value ascending", function () {
      const firstNode = tabIndexedNodes.item(0),
        secondNode = tabIndexedNodes.item(1);

      // Sort secondNode 1 before firstNode 2
      assert.equal(sortByTabIndex(firstNode, secondNode), 1);
      assert.equal(sortByTabIndex(secondNode, firstNode), -1);
    });
    it("should put 0 values after positive values", function () {
      const firstNode = tabIndexedNodes.item(0),
        secondNode = tabIndexedNodes.item(3);

      // Sort secondNode 0 after firstNode 2
      assert.equal(sortByTabIndex(firstNode, secondNode), -1);
      assert.equal(sortByTabIndex(secondNode, firstNode), 1);
    });
    it("should keep the original order of 0 values", function () {
      const firstNode = tabIndexedNodes.item(3),
        secondNode = tabIndexedNodes.item(6);

      // Sort firstNode before secondNode
      assert.equal(sortByTabIndex(firstNode, secondNode), 0);
      // Sort secondNode before firstNode
      assert.equal(sortByTabIndex(secondNode, firstNode), 0);
    });
    it("should throw an error when a negative value is passed", function () {
      const firstNode = tabIndexedNodes.item(0),
        secondNode = tabIndexedNodes.item(2);

      assert.throws(() => sortByTabIndex(firstNode, secondNode));
      assert.throws(() => sortByTabIndex(secondNode, firstNode));
    });
    it("should throw an error when a negative value is passed", function () {
      const sortedArray = Array.from(tabIndexedNodes)
        .filter((node) => node.getAttribute("tabindex") >= 0)
        .sort(sortByTabIndex);

      assert.deepEqual(sortedArray, [
        tabIndexedNodes.item(1),
        tabIndexedNodes.item(0),
        tabIndexedNodes.item(5),
        tabIndexedNodes.item(3),
        tabIndexedNodes.item(6),
      ]);
    });
  });

  describe("#getTabIndexOfNode", function () {
    let tabIndexedNodes;
    beforeEach(function () {
      const dom = new JSDOM(
        `<html>
           <body>
             <button class="to-test" id="one" tabindex="2">1</button>
             <button class="to-test" id="three" tabindex="-1">3</button>
             <button class="to-test" id="four" tabindex="0">4</button>
             <button class="to-test">5</button>
             <span class="to-test">foobar</span>
           </body>
         </html>`
      );
      tabIndexedNodes = dom.window.document.querySelectorAll(".to-test");
    });
    it("should get the tab index as numbers of nodes", function () {
      const tabIndexes = Array.from(tabIndexedNodes).map((node) =>
        getTabIndexOfNode(node)
      );
      assert.deepEqual(tabIndexes, [2, -1, 0, 0, 0]);
    });
  });
});
