import {
  addElementToTabOrder,
  removeElementFromTabOrder,
  buildNonTrappedElementsCssSelector,
  getCustomNonTrappedTabindexAttribute,
} from "../src/util.js";
import assert from "assert";
import { JSDOM } from "jsdom";

describe("Utility functions", function () {
  describe("#buildNonTrappedElementsCssSelector", function () {
    it("should convert the selector list into a passable string", function () {
      assert.equal(
        buildNonTrappedElementsCssSelector(),
        "a[href]:not(.use-focus-trap-modal a[href]), area[href]:not(.use-focus-trap-modal area[href]), input:not([disabled]):not([type=hidden]):not(.use-focus-trap-modal input:not([disabled]):not([type=hidden])), select:not([disabled]):not(.use-focus-trap-modal select:not([disabled])), textarea:not([disabled]):not(.use-focus-trap-modal textarea:not([disabled])), button:not([disabled]):not(.use-focus-trap-modal button:not([disabled])), iframe:not(.use-focus-trap-modal iframe), object:not(.use-focus-trap-modal object), embed:not(.use-focus-trap-modal embed), *[tabindex]:not(.use-focus-trap-modal *[tabindex]), *[contenteditable]:not(.use-focus-trap-modal *[contenteditable])"
      );
    });
  });
  describe("#getCustomNonTrappedTabindexAttribute", function () {
    it("should provide a correctly named custom attribute", function () {
      assert.equal(
        getCustomNonTrappedTabindexAttribute(),
        "data-non-trapped-tabindex"
      );
    });
  });
  describe("#addElementToTabOrder", function () {
    let tabIndexValues;
    beforeEach(function () {
      const dom = new JSDOM(
        `<html>
           <body>
             <button class="to-test" data-non-trapped-tabindex="4" tabindex="2">Foo</button>
             <button class="to-test" data-non-trapped-tabindex="5" tabindex="-1">Bar</button>
             <button class="to-test" data-non-trapped-tabindex="6">Foobar</button>
             <button class="to-test" tabindex="2">Foo</button>
             <button class="to-test" data-non-trapped-tabindex="null" tabindex="-1">Bar</button>
             <button class="to-test" data-non-trapped-tabindex="null">Bar</button>
           </body>
         </html>`
      );
      tabIndexValues = Array.from(
        dom.window.document.querySelectorAll(".to-test")
      )
        .map((node) => {
          addElementToTabOrder(node);
          return node;
        })
        .map((node) => node.getAttribute("tabindex"));
    });
    it("should pass the value from the custom attribute to the real tabindex", function () {
      assert.deepEqual(
        [tabIndexValues[0], tabIndexValues[1], tabIndexValues[2]],
        [4, 5, 6]
      );
    });
    it("should translate 'null' to 0", function () {
      assert.deepEqual([tabIndexValues[4], tabIndexValues[5]], [0, 0]);
    });
    it("should not overwrite when custom attribute is not present", function () {
      assert.equal(tabIndexValues[3], 2);
    });
  });
  describe("#removeElementFromTabOrder", function () {
    let customAttributeValues;
    let tabIndexValues;
    beforeEach(function () {
      const dom = new JSDOM(
        `<html>
           <body>
             <button class="to-test" data-non-trapped-tabindex="4" tabindex="2">Foo</button>
             <button class="to-test" data-non-trapped-tabindex="5" tabindex="-1">Bar</button>
             <button class="to-test" data-non-trapped-tabindex="6">Foobar</button>
             <button class="to-test" tabindex="2">Foo</button>
             <button class="to-test" tabindex="-1">Bar</button>
             <button class="to-test">Foobar</button>
           </body>
         </html>`
      );
      const tabIndexedNodes = Array.from(
        dom.window.document.querySelectorAll(".to-test")
      ).map((node) => {
        removeElementFromTabOrder(node);
        return node;
      });
      customAttributeValues = tabIndexedNodes.map(
        (node) => node.dataset.nonTrappedTabindex
      );
      tabIndexValues = tabIndexedNodes.map((node) =>
        node.getAttribute("tabindex")
      );
    });
    it("should overwrite any existing custom attribute values", function () {
      assert.deepEqual(
        [
          customAttributeValues[0],
          customAttributeValues[1],
          customAttributeValues[2],
        ],
        [2, -1, "null"]
      );
    });
    it("should add custom attribute values with the value in the tabindex", function () {
      assert.deepEqual(
        [
          customAttributeValues[3],
          customAttributeValues[4],
          customAttributeValues[5],
        ],
        [2, -1, "null"]
      );
    });
    it("should overwrite any tabindex value with -1", function () {
      assert.deepEqual(tabIndexValues, [-1, -1, -1, -1, -1, -1]);
    });
  });
});
