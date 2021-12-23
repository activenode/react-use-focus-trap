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

function sanitizeTabIndexInput(tabIndex, maxValue) {
  if (tabIndex < 0) {
    throw new Error(
      "Unable to sort given input. A negative value is not part of the tab order: ",
      tabIndex
    );
  }
  // 0 based tab indexes have a higher order than positive valued indicies, thus we add 1 to the max value
  return tabIndex === 0 ? maxValue + 1 : tabIndex;
}

function getTabIndexOfNode(targetNode) {
  return convertToIntOrFallback(targetNode.getAttribute("tabindex"));
}
