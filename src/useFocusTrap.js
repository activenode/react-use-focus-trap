import { useEffect, useRef } from "react";
import { MODAL_WRAPPER_CLASS } from "./constant.js";
import {
  removeElementFromTabOrder,
  addElementToTabOrder,
  buildNonTrappedElementsCssSelector,
} from "./util.js";

export function useFocusTrap() {
  const trapRef = useRef(null);
  useEffect(() => {
    if (!trapRef.current) {
      return;
    }
    trapRef.current.classList.add(MODAL_WRAPPER_CLASS);
    getNonTrappedFocusableElements().forEach(removeElementFromTabOrder);
    return () => {
      getNonTrappedFocusableElements().forEach(addElementToTabOrder);
    };
  });
  return [trapRef];
}

function getNonTrappedFocusableElements() {
  return document.body.querySelectorAll(buildNonTrappedElementsCssSelector());
}
