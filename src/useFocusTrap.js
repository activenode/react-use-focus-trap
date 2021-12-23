import { useCallback, useEffect, useRef } from "react";
import { sortByTabIndex } from "./util.js";

const focusableElementsSelector =
  "a[href], area[href], input:not([disabled]):not([type=hidden]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";
const TAB_KEY = 9;

export function useFocusTrap() {
  const trapRef = useRef(null);

  const selectNextFocusableElem = useCallback(
    (
      sortedFocusableElems,
      currentIndex,
      shiftKeyPressed = false,
      skipCount = 0
    ) => {
      if (skipCount > sortedFocusableElems.length) {
        // this means that it ran through all of elements but non was properly focusable
        // hence we stop it to avoid running in an infinite loop
        return false;
      }

      const backwards = !!shiftKeyPressed;
      const maxIndex = sortedFocusableElems.length - 1;

      if (!currentIndex) {
        currentIndex =
          sortedFocusableElems.indexOf(document.activeElement) ?? 0;
      }

      let nextIndex = backwards ? currentIndex - 1 : currentIndex + 1;
      if (nextIndex > maxIndex) {
        nextIndex = 0;
      }

      if (nextIndex < 0) {
        nextIndex = maxIndex;
      }

      const newFocusElem = sortedFocusableElems[nextIndex];

      newFocusElem.focus();

      if (document.activeElement !== newFocusElem) {
        // run another round
        selectNextFocusableElem(
          sortedFocusableElems,
          nextIndex,
          shiftKeyPressed,
          skipCount + 1
        );
      }
    }
  );

  // defining the trap function first
  const trapper = useCallback((evt) => {
    const trapRefElem = trapRef.current;
    if (trapRefElem !== null) {
      if (evt.which === TAB_KEY || evt.key === "Tab") {
        evt.preventDefault();
        const shiftKeyPressed = !!evt.shiftKey;
        let focusableElems = Array.from(
          trapRefElem.querySelectorAll(focusableElementsSelector)
        ).filter(
          (focusableElement) => focusableElement.getAttribute("tabindex") >= 0
        ); // caching this is NOT a good idea in dynamic applications - so don't!
        // now we need to sort it by tabIndex, highest first
        focusableElems = focusableElems.sort(sortByTabIndex);

        selectNextFocusableElem(focusableElems, undefined, shiftKeyPressed);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", trapper);

    return () => {
      window.removeEventListener("keydown", trapper);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [trapRef];
}
