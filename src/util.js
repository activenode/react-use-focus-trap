export function convertToIntOrFallback(stringToConvert) {
  const parsed = parseInt(stringToConvert);
  return parsed ? parsed : 0;
}

export function sortByTabIndex(firstNode, secondNode) {
  const tabIndexes = [firstNode, secondNode].map((node) =>
    getTabIndexOfNode(node)
  );
  return tabIndexes
    .map((tabIndexValue) =>
      sanitizeTabIndexInput(tabIndexValue, Math.max(...tabIndexes))
    )
    .reduce((previousValue, currentValue) => previousValue - currentValue);
}

/**
 * Prepares a tab-index to be further processed for the tab order of the focus trap.
 * It can't be less than 0, because negative values can not be part of the tab order at all.
 * In case it's exactly 0 it actually needs to be higher than any positive (> 0) value, since tab-index=0 means "follow the system default order".
 * The default tab order comes _after_ special tab indexes (>0).
 * @param {number} tabIndex The index to sanitize
 * @param {number} highestPositiveTabIndex The largest number among the tab indexes from the same context
 * @throws An error if the tabIndex is less than 0
 * @returns Tha sanitized tab index
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex} for further information on the tabindex and its order
 */
function sanitizeTabIndexInput(tabIndex, highestPositiveTabIndex) {
  if (tabIndex < 0) {
    throw new Error(
      `Unable to sort given input. A negative value is not part of the tab order: ${tabIndex}`
    );
  }
  // 0 based tab indexes have a higher order than positive valued indicies, thus we add 1 to the max value
  return tabIndex === 0 ? highestPositiveTabIndex + 1 : tabIndex;
}

function getTabIndexOfNode(targetNode) {
  return convertToIntOrFallback(targetNode.getAttribute("tabindex"));
}
