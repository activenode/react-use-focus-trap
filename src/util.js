import {
  FOCUSABLE_ELEMENT_SELECTORS,
  MODAL_WRAPPER_CLASS,
  NON_TRAPPED_TABINDEX_ATTRIBUTE,
} from "./constant.js";

export function buildNonTrappedElementsCssSelector() {
  return FOCUSABLE_ELEMENT_SELECTORS.reduce(
    (selectorString, currenSelector) =>
      `${selectorString}${currenSelector}:not(.${MODAL_WRAPPER_CLASS} ${currenSelector}), `,
    ""
  ).slice(0, -2);
}

export function getCustomNonTrappedTabindexAttribute() {
  return `data-${NON_TRAPPED_TABINDEX_ATTRIBUTE}`;
}

export function addElementToTabOrder(node) {
  const customPropertyValue = node.getAttribute(
    getCustomNonTrappedTabindexAttribute()
  );
  // Do not overwrite the tab-index in case it hasn't been touched yet
  if (!customPropertyValue) {
    return;
  }
  node.setAttribute(
    "tabindex",
    sanitizeCustomPropertyValue(customPropertyValue)
  );
}

function sanitizeCustomPropertyValue(customPropertyValue) {
  return customPropertyValue === "null" ? 0 : customPropertyValue;
}

export function removeElementFromTabOrder(node) {
  node.setAttribute(
    getCustomNonTrappedTabindexAttribute(),
    node.getAttribute("tabindex")
  );
  node.setAttribute("tabindex", -1);
}
