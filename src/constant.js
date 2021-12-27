export const FOCUSABLE_ELEMENT_SELECTORS = [
  "a[href]",
  "area[href]",
  "input:not([disabled]):not([type=hidden])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "iframe",
  "object",
  "embed",
  "*[tabindex]",
  "*[contenteditable]",
];

export const MODAL_WRAPPER_CLASS = "use-focus-trap-modal";

export const NON_TRAPPED_TABINDEX_ATTRIBUTE = "non-trapped-tabindex";
